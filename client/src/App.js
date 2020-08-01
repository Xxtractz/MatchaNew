import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import "./App.scss";
// import 'bootstrap/dist/css/bootstrap.min.css';

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
import Sockets from "./components/Socket/sockets";
import ViewUser from "./components/Account/viewuser";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute exact path="/user" component={Account} />
            <PrivateRoute exact path="/user/view" component={ViewUser} />
            <PrivateRoute exact path="/sockets" component={Sockets} />
            <PublicRoute exact path="/login" component={Login} />
            <PublicRoute exact path="/register" component={Register} />
            <PublicRoute exact path="/verify" component={verifyUser} />
            <PublicRoute exact path="/forgot" component={Forgot} />
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
