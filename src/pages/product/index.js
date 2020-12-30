import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import ProductAddUpdate from "./addupdate";
import ProductDetail from "./detail";
import ProductHome from "./producthome";

export default class Product extends Component {
  render() {
    return (
      <Switch>
        <Route path="/product" component={ProductHome} exact />
        <Route path="/product/detail" component={ProductDetail} />
        <Route path="/product/addupdate" component={ProductAddUpdate} />
        <Redirect to="/product" />
      </Switch>
    );
  }
}
