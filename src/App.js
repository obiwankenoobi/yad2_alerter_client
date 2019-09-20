import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Main from "./Screens/Main/Main";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from "../src/Screens/Home/Home";
import Admin from "../src/Screens/Admin/Admin";
import AskResetPassword from "../src/Screens/Admin/AskResetPassword";
import ResetPassword from "../src/Screens/Admin/ResetPassword";

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </Router>
    );
  }
}

export default App;
