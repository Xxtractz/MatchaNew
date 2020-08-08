import React, { Component } from "react";
import { register } from "../../actions/api";
import Alert from "@material-ui/lab/Alert";
import {
  Button,
  TextField,
  Card,
  CardActions,
  ButtonBase,
} from "@material-ui/core";
import {
  isYearValid,
  isDayValid,
  isMonthValid,
  isEmpty,
  isChar,
  validateAge,
  getAge,
  isEqual,
  isPassword,
} from "../../utils/validate";
import {NAV} from "../../models/nav";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      fname_err: "",
      fname_err_helperText: "",
      lname: "",
      lname_err: "",
      lname_err_helperText: "",
      username: "",
      username_err: "",
      username_err_helperText: "",
      year: "",
      year_err: "",
      year_err_helperText: "",
      month: "",
      month_err: "",
      month_err_helperText: "",
      day: "",
      day_err: "",
      day_err_helperText: "",
      email: "",
      email_err: "",
      email_err_helperText: "",
      password: "",
      password_err: "",
      password_err_helperText: "",
      confirmPassword: "",
      confirmPassword_err: "",
      confirmPassword_err_helperText: "",
      error: "",
    };
  }

  onChange = (e) => {
    this.validateAfterInput(e);
    this.setState({
      [e.target.name]: [e.target.value],
    });
  };

  submitHandler = (e) => {
    e.preventDefault();
    if (this.isvalidated()) {
      const user = {
        fname: this.state.fname.toString(),
        lname: this.state.lname.toString(),
        username: this.state.username.toString(),
        dob: this.state.day + "/" + this.state.month + "/" + this.state.year,
        age: getAge(
          this.state.year + "-" + this.state.month + "-" + this.state.day
        ).toString(),
        email: this.state.email.toString(),
        password: this.state.password.toString(),
      };
      this.register(user);
    }
  };

  register(userData) {
    register(userData).then((res) => {
      if (res.status === "true") {
        window.location.replace("/login#regSuccess");
      } else if (res.status === "false") {
        this.setState({ error: res.message });
      }
    });
  }

  //  Validation before posting to backend
  isvalidated() {
    return isEmpty(this.state.fname_err) &&
        isEmpty(this.state.lname_err) &&
        isEmpty(this.state.username_err) &&
        isEmpty(this.state.year_err) &&
        isEmpty(this.state.month_err) &&
        isEmpty(this.state.day_err) &&
        isEmpty(this.state.email_err) &&
        isEmpty(this.state.password_err) &&
        isEmpty(this.state.confirmPassword_err);
  }

  isAgeValid() {
    if (
      isEmpty(this.state.year_err) &&
      isEmpty(this.state.month_err) &&
      isEmpty(this.state.day_err)
    ) {
      return true;
    } else {
      validateAge(
        getAge(this.state.year + "-" + this.state.month + "-" + this.state.day)
      );
    }
  }

  //  Validation After input and displaying of errors
  validateAfterInput(e) {
    if (e.target.name === "fname") {
      if (!isChar(e.target.value)) {
        this.setState({ fname_err: "error" });
        this.setState({ fname_err_helperText: "Invalid" });
      } else {
        this.setState({ fname_err: "" });
        this.setState({ fname_err_helperText: "" });
      }
    }
    if (e.target.name === "lname") {
      if (!isChar(e.target.value)) {
        this.setState({ lname_err: "error" });
        this.setState({ lname_err_helperText: "Invalid" });
      } else {
        this.setState({ lname_err: "" });
        this.setState({ lname_err_helperText: "" });
      }
    }
    if (e.target.name === "year") {
      if (!isYearValid(e.target.value)) {
        this.setState({ year_err: "error" });
        this.setState({ year_err_helperText: "Invalid Year" });
      } else {
        this.setState({ year_err: "" });
        this.setState({ year_err_helperText: "" });
      }
    }
    if (e.target.name === "month") {
      if (!isMonthValid(e.target.value)) {
        this.setState({ month_err: "error" });
        this.setState({ month_err_helperText: "Invalid Month" });
      } else {
        this.setState({ month_err: "" });
        this.setState({ month_err_helperText: "" });
      }
    }
    if (e.target.name === "day") {
      if (!isDayValid(e.target.value)) {
        this.setState({ day_err: "error" });
        this.setState({ day_err_helperText: "Invalid Day" });
      } else {
        this.setState({ day_err: "" });
        this.setState({ day_err_helperText: "" });
      }
    }
    if (e.target.name === "password") {
      if (!isPassword(e.target.value)) {
        this.setState({ password_err: "error" });
        this.setState({ password_err_helperText: "Passwords Isn't Secured" });
      } else {
        this.setState({ password_err: "" });
        this.setState({ password_err_helperText: "" });
      }
    }
    if (e.target.name === "confirmPassword") {
      if (!isEqual(e.target.value, this.state.password.toString())) {
        this.setState({ confirmPassword_err: "error" });
        this.setState({
          confirmPassword_err_helperText: "Passwords Don't Match",
        });
      } else {
        this.setState({ confirmPassword_err: "" });
        this.setState({ confirmPassword_err_helperText: "" });
      }
    }
    this.setState({ error: "" });
  }

  // Components for form
  inputSection() {
    return (
      <div className="grey-text">
        {/* Fname and  lastName Row */}
        {this.nameSection()}

        {/* Age / Date of Birth  */}
        {this.ageSection()}

        {/* Username */}
        {this.usernameSection()}

        {/* Email */}
        {this.emailSection()}

        {/* Password */}
        {this.passwordSection()}

        {/* Confirm Password  */}
        {this.confirmPasswordSection()}
      </div>
    );
  }

  nameSection() {
    return (
      <div className="row mb-3">
        <div className="col-6 text-center">
          <TextField
              className="col-12"
              type="text"
              name="fname"
              label="First Name"
              helperText={this.state.fname_err_helperText}
              error={!!this.state.fname_err}
              value={this.state.fname}
              onChange={(e) => this.onChange(e)}
              required
          />
        </div>
        <div className="col-6 text-center">
          <TextField
            className="col-12"
            type="text"
            name="lname"
            label="Last Name"
            helperText={this.state.lname_err_helperText}
            error={!!this.state.lname_err}
            value={this.state.lname}
            onChange={(e) => this.onChange(e)}
            required
          />
        </div>
      </div>
    );
  }

  displayAgeError() {
    return (
      <div className="col-12 mt-3 text-center " style={{ color: "#ff0000" }}>
        <small>Only users between 18 and 70 </small>
      </div>
    );
  }

  ageSection() {
    return (
      <div className="row mb-3">
        <div className="col text-center">
          <TextField
            id="date_yy"
            label="YYYY"
            name="year"
            type="text"
            className="col-8"
            helperText={this.state.year_err_helperText}
            error={!!this.state.year_err}
            value={this.state.year}
            onChange={(e) => this.onChange(e)}
            inputProps={{ maxLength: 4 }}
            required
            autoComplete="year"
          />
        </div>
        <div className="col text-center">
          <TextField
            id="date_month"
            label="MM"
            name="month"
            type="text"
            className="col-8"
            helperText={this.state.month_err_helperText}
            error={!!this.state.month_err}
            value={this.state.month}
            onChange={(e) => this.onChange(e)}
            inputProps={{ maxLength: 2 }}
            required
            autoComplete="month"
          />
        </div>
        <div className="col text-center">
          <TextField
            id="date_day"
            label="DD"
            name="day"
            type="text"
            className="col-8"
            helperText={this.state.day_err_helperText}
            error={!!this.state.day_err}
            value={this.state.day}
            onChange={(e) => this.onChange(e)}
            inputProps={{ maxLength: 2 }}
            required
            autoComplete="day"
          />
        </div>
        {this.isAgeValid() ? "" : this.displayAgeError()}
      </div>
    );
  }

  usernameSection() {
    return (
      <div className="row mb-3">
        <div className="col-12 text-center">
          <TextField
            className="col-12"
            type="text"
            name="username"
            label="Username"
            helperText={this.state.username_err_helperText}
            error={!!this.state.username_err}
            value={this.state.username}
            onChange={(e) => this.onChange(e)}
            required
            autoComplete="username"
          />
        </div>
      </div>
    );
  }

  emailSection() {
    return (
      <div className="row mb-3">
        <div className="col-12 text-center">
          <TextField
            className="col-12"
            type="email"
            name="email"
            label="Email"
            helperText={this.state.email_err_helperText}
            error={!!this.state.email_err}
            value={this.state.email}
            onChange={(e) => this.onChange(e)}
            required
            autoComplete="email"
          />
        </div>
      </div>
    );
  }

  passwordSection() {
    return (
      <div className="row mb-3">
        <div className="col-12 text-center">
          <TextField
            className="col-12"
            name="password"
            type="password"
            label="Password"
            helperText={this.state.password_err_helperText}
            error={!!this.state.password_err}
            value={this.state.password}
            onChange={(e) => this.onChange(e)}
            required
            autoComplete="new-password"
          />
        </div>
      </div>
    );
  }

  confirmPasswordSection() {
    return (
      <div className="row mb-3">
        <div className="col-12 text-center">
          <TextField
            className="col-12"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            helperText={this.state.confirmPassword_err_helperText}
            error={!!this.state.confirmPassword_err}
            value={this.state.confirmPassword}
            onChange={(e) => this.onChange(e)}
            required
            autoComplete="new-password"
          />
        </div>
      </div>
    );
  }

  displayErr() {
    if (this.state.error) {
      if (this.state.error.toString() === "") {
        return <div/>;
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
    return <div/>;
  }
  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-8 mx-auto pt-5 mt-5">
              <Card
                className="card m-5 p-5 mx-auto col-10 form"
                variant="outlined"
              >
                {/* Form Starts */}
                <form onSubmit={this.submitHandler}>
                  {/* Header Text Start */}
                  <p className="h3 text-center mb-4">Register</p>
                  <div className="text-center">
                    <small> Please Enter your Registration details below</small>
                  </div>
                  {/* Header Text End */}

                  {/* Error Section */}
                  {this.displayErr()}

                  <hr className="mb-2 ml-5 mr-5"/>

                  {/* Input Box Start */}
                  {this.inputSection()}
                  {/* Input Box End */}

                  {/* Button */}
                  <div className="text-center p-3 mt-4">
                    <Button variant="outlined" color="primary" type="submit">
                      Register
                    </Button>
                  </div>
                </form>
                {/* Form Ends */}

                <hr />
                <CardActions className="bg-gray">
                  <ButtonBase variant="text" size="small" href={NAV.LOGIN}>
                    Already a have an account?
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

export default Register;
