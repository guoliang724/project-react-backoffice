import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import memory from "../../utils/memory";
import { Layout } from "antd";
import LeftNav from "../left-nav";
import Header from "../header";
import { Route, Switch } from "react-router-dom";
import Home from "../../pages/home";
import Product from "../../pages/product";
import Category from "../../pages/category";
import Pie from "../../pages/charts/pie";
import Bar from "../../pages/charts/bar";
import Line from "../../pages/charts/line";
import User from "../../pages/user";
import Role from "../../pages/role";

const { Footer, Sider, Content } = Layout;
export default class Admin extends Component {
  render() {
    const { user } = memory;

    if (!memory || !user) {
      return <Redirect to="/login" />;
    } else
      return (
        <Layout
          style={{
            height: "100%",
          }}
        >
          <Sider>
            <LeftNav />
          </Sider>
          <Layout>
            <Header> {user.username}</Header>
            <Content
              style={{
                margin: "20px",
                backgroundColor: "#fff",
              }}
            >
              <Switch>
                <Route path="/home" component={Home} />
                <Route path="/category" component={Category} />
                <Route path="/product" component={Product} />
                <Route path="/user" component={User} />
                <Route path="/role" component={Role} />
                <Route path="/charts/pie" component={Pie} />
                <Route path="/charts/bar" component={Bar} />
                <Route path="/charts/line" component={Line} />
                <Redirect to="/home" />
              </Switch>
            </Content>
            <Footer
              style={{
                textAlign: "center",
                color: "#ccc",
              }}
            >
              Welcome To My Project
              <br />
              Contact Information:guoliang.z831@gmail.com
            </Footer>
          </Layout>
        </Layout>
      );
  }
}
