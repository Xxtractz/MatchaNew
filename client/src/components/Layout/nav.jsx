import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { logout } from "../../actions/api";
import {
  getUserFirstName,
  getUserLastName,
  getUsername,
  getProfilePicture, getActive,
} from "../../actions/user";
import Badge from '@material-ui/core/Badge';
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@material-ui/core";
import { NAV } from '../../models/nav';

class Nav extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
    };
    this.firstname = getUserFirstName();
    this.lastname = getUserLastName();
  }

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  togglebutton() {
    if (this.state.isOpen) {
      return "navbar-toggler float-right collapsed";
    } else {
      return "navbar-toggler float-right";
    }
  }

  toggle() {
    if (this.state.isOpen) {
      return "navbar-collapse collapse show";
    } else {
      return "navbar-collapse collapse ";
    }
  }

  logout() {
    const user = {
      username: getUsername(),
    };
    logout(user);
  }

  homeMenu() {
    return (
      <a className="text-decoration-none text-white" href="/">
        <ListItem button className="text-center">
          <ListItemText>Home</ListItemText>
        </ListItem>
      </a>
    );
  }

  messageMenu() {
    return (
      <a className="text-decoration-none text-white" href={NAV.CHAT}>
        <ListItem button className="text-center ">
          <ListItemText>Message</ListItemText>
        </ListItem>
      </a>
    );
  }

  accountMenu() {
    return (
      <a className="text-decoration-none text-white" href={NAV.ACCOUNT}>
        <ListItem button className="text-center ">
          <ListItemText>Account</ListItemText>
        </ListItem>
      </a>
    );
  }

  notificationMenu() {
    return (
        <a className="text-decoration-none text-white mx-auto" href={NAV.NOTIFICATIONS}>

          <ListItem button className="text-center ">

              <ListItemText>
                <Badge className="text-center " label="Show badge" color="secondary">
                  Notifications
                </Badge>
              </ListItemText>

          </ListItem>

        </a>
    );
  }

  render() {
    return (
      <Router>
        <div>
          {/* Start Of Side Bar */}
          <div className="sidebar">
            <div className="col-12 mt-5 ">
              <Card className="mt-5 text-center bg_transparent_white ">
                <CardMedia className="">
                  <img
                    className="card-img"
                    src={getProfilePicture()}
                    alt="profile"
                  />
                </CardMedia>
                <CardContent>
                  <Typography>
                    {this.firstname} {this.lastname}
                  </Typography>
                </CardContent>
              </Card>
            </div>
            <hr />
            <div className="col-12">
              <List component="nav">
                {this.homeMenu()}

                {getActive() === 1 ? this.messageMenu() : ""}
                {getActive() === 1 ? this.notificationMenu() : ""}

                {this.accountMenu()}

                <Divider light></Divider>
                <ListItem
                  button
                  className="text-center"
                  onClick={() => this.logout()}
                >
                  <ListItemText>
                    <PowerSettingsNewIcon className="" />
                    <span className="p-1">Logout</span>
                  </ListItemText>
                </ListItem>
              </List>
            </div>
          </div>
          {/* End of SideBar
           *Nav Starts here
           */}
          <div className="navbarCustom navbar navbar-expand-lg navbar-dark fixed-top bg_secondary">
            <a className="navbar-brand " href="/">
              Matcha
            </a>
            <button
              className={this.togglebutton()}
              onClick={this.toggleCollapse}
              type="button"
              data-toggle="collapsed"
              data-target="#navbarsExample07"
              aria-controls="navbarsExample07"
              aria-expanded={this.state.isOpen}
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className={this.toggle()}>
              <ul className="navbar-nav ml-auto">
                <List component="nav">
                  {this.homeMenu()}

                  {getActive() === 1 ? this.messageMenu() : ""}

                  {this.accountMenu()}

                  <Divider light></Divider>
                  <ListItem
                    button
                    className="text-center"
                    onClick={() => this.logout()}
                  >
                    <ListItemText>
                      <PowerSettingsNewIcon className="" />
                      <span className="p-1">Logout</span>
                    </ListItemText>
                  </ListItem>
                </List>
              </ul>
            </div>
          </div>
          {/* Nav ends Here */}
        </div>
      </Router>
    );
  }
}
export default Nav;
