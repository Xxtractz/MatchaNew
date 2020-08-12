import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import "./App.scss";

import { NAV } from "../src/models/nav";
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

// Pages
import Home from "./components/Home/index";
import Login from "./components/Login/login";
import Register from "./components/Registration/register";
import Account from "./components/Account/account";
import NotFound from "./components/Error/404";
import Forgot from "./components/Forgot/forgot";
import verifyUser from "./components/Registration/verify";

// Modified Route
import { PrivateRoute } from "./actions/private.route";
import { PublicRoute } from "./actions/public.route";
import Admin from "./components/admin";
import ViewUser from "./components/Account/viewuser";
import Chat from "./components/Chat/chat";
import Notifications from "./components/Notifications/Notifications";

class App extends Component {
  render() {
    return (
      <div>
        <ReactNotification />
        <Router>
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute exact path={NAV.ACCOUNT} component={Account} />
            <PrivateRoute exact path={NAV.VIEW_USER} component={ViewUser} />
            <PrivateRoute exact path={NAV.CHAT} component={Chat} />
            <PrivateRoute exact path={NAV.NOTIFICATIONS} component={Notifications} />
            <PublicRoute exact path={NAV.LOGIN} component={Login} />
            <PublicRoute exact path={NAV.REGISTER} component={Register} />
            <PublicRoute exact path={NAV.VERIFY} component={verifyUser} />
            <PublicRoute exact path={NAV.FORGOT} component={Forgot} />
            <PublicRoute exact path="/admin" component={Admin} />
            <Route exact path="/404" component={NotFound} />
            <Redirect to="/404" />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
