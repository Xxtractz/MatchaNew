import React, { Component } from "react";
import { login } from "../../actions/api";
import {Button, TextField, Card, CardActions, ButtonBase} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";
import {NAV} from "../../models/nav";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      username_err: "",
      username_err_helperText: "",
      password: "",
      password_err: "",
      password_err_helperText: "",
      isopen: true,
      errorResponse: false,
      verifyErrorMsg: "",
      verifyToken: "",
      error: "",
    };
  }

  displayVerifyError() {
    return (
      <Collapse in={this.state.isopen}>
        <Alert
          variant="outlined"
          severity="error"
          action={
            <IconButton
              aria-label="close"
              size="small"
              onClick={() => {
                this.setState({ isopen: false });
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <strong>{this.state.verifyErrorMsg}</strong>{" "}
          <a
            href={
              "http://localhost:3000/verify/?token=" + this.state.verifyToken
            }
          >
            Click here to verify
          </a>
        </Alert>
      </Collapse>
    );
  }

  displayVerify() {
    return (
      <Collapse in={this.state.isopen}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                this.setState({ isopen: false });
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          Registration Was Successful,Verification link has been sent via Email.
          <strong>Verify Account before Loggin</strong>
        </Alert>
      </Collapse>
    );
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: [e.target.value],
    });
    if (this.state.error) {
      this.setState({ error: "" });
    }
  };

  validInput() {
    return true;
  }

  submitHandler = (e) => {
    e.preventDefault();

    const user = {
      username: this.state.username.toString(),
      password: this.state.password.toString(),
    };
    this.login(user);
  };

  login(loginUserData) {
    if (this.validInput()) {
      login(loginUserData)
        .then((res) => {
          console.log(res);
          if (res) {
            if (res === 200) {
              window.location.reload();
            } else if (res.status === 404) {
              this.setState({ error: "Username does not exist" });
            } else if (res.status === 401) {
              this.setState({ error: "Invalid Credentials" });
            } else if (res.status === 401) {
              this.setState({ errorResponse: true });
              this.setState({ verifyErrorMsg: res.data.User.toString() });
              this.setState({ verifyToken: res.data.token.toString() });
            }else {
              this.setState({ error: "Sorry, System is unavailable, please try again later" });
            }
          } else {
            console.log("Server is Offline");
          }
        })
        .catch((err) => {
          console.log(err);
          console.log("Timeout");
        });
    } else this.setState({ err: "Invalid Details Entered" });
  }

  // Form Sections
  usernameSection() {
    return (
      <div className="row">
        <div className="col-12 text-center">
          <TextField
            className="col-12"
            type="text"
            name="username"
            label="Username"
            helperText={this.state.username_err_helperText}
            error={this.state.username_err ? true : false}
            value={this.state.username}
            onChange={(e) => this.onChange(e)}
            required
            autoComplete="username"
          />
        </div>
      </div>
    );
  }

  passwordSection() {
    return (
      <div className="row">
        <div className="col-12 text-center">
          <TextField
            className="col-12"
            name="password"
            type="password"
            label="Password"
            helperText={this.state.password_err_helperText}
            error={this.state.password_err ? true : false}
            value={this.state.password}
            onChange={(e) => this.onChange(e)}
            required
            autoComplete="current-password"
          />
        </div>
      </div>
    );
  }

  displayErr() {
    if (this.state.error) {
      if (this.state.error.toString() === "") {
        return <div />;
      } else {
        return (
          <div className="m-2 ml-5 mr-5">
            <Alert variant="outlined" severity="error">
              {this.state.error.toString()}
            </Alert>
          </div>
        );
      }
    }
    return <div />;
  }

  render() {
    return (
      <div>
        <div className="container">
          {window.location.hash === "#regSuccess" ? this.displayVerify() : ""}
          {this.state.errorResponse ? this.displayVerifyError() : ""}
          <div className="row">
            <div className="col-md-6 mx-auto pt-5 mt-5">
              {this.displayErr()}
              <Card
                className="card m-5 p-5 mx-auto col-10 form"
                variant="outlined"
              >
                <form onSubmit={this.submitHandler}>
                  <p className="h3 text-center mb-4">Sign in</p>
                  <div className="text-center">
                    <small> Please Enter you login details below</small>
                  </div>
                  <hr className="mb-2 ml-5 mr-5"></hr>
                  <div className="grey-text">
                    {/* Username Section */}
                    {this.usernameSection()}

                    {/* Password Section */}
                    {this.passwordSection()}
                  </div>
                  <div className="text-center p-3">
                    <Button variant="outlined" color="primary" type="submit">
                      Login
                    </Button>
                  </div>
                </form>
                <hr />
                <CardActions className="bg-gray">
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    href={NAV.REGISTER}
                  >
                    Register
                  </Button>
                </CardActions>
                <CardActions className="bg-gray">
                  <ButtonBase variant="text" size="small" href={NAV.FORGOT}>
                    forgot password?
                  </ButtonBase>
                  <ButtonBase variant="text" size="small" href={NAV.VERIFY}>
                  verify account?
                </ButtonBase>
                </CardActions>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
