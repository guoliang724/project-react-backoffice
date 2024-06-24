import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Admin from "./components/admin";
import Login from "./components/login";
export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/" component={Admin}></Route>
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    );
  }
}
