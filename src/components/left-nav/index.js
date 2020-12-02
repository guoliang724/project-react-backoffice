import React, { Component } from "react";
import "./index.css";
import logo from "../../assets/images/logo.png";
import { Link, withRouter } from "react-router-dom";
import { Menu } from "antd";
import { manueList } from "../../config/leftManue";

const { SubMenu } = Menu;

class LeftNav extends Component {
  getNodes = (list) => {
    return list.map((item) => {
      if (!item.hasOwnProperty("children"))
        return (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.path}> {item.content} </Link>
          </Menu.Item>
        );
      else
        return (
          <SubMenu key={item.key} icon={item.icon} title={item.content}>
            {this.getNodes(item.children)}
          </SubMenu>
        );
    });
  };
  render() {
    let nav = this.props.location.pathname;
    if (nav.indexOf("/product") === 0) {
      nav = "/product";
    }
    return (
      <div className="left-nav">
        <Link to="/" className="left-nav-header">
          <img src={logo} alt="logo" />
          <h1>BackOffice</h1>
        </Link>
        <div>
          <Menu mode="inline" theme="dark" selectedKeys={[nav]}>
            {this.getNodes(manueList)}
          </Menu>
        </div>
      </div>
    );
  }
}
export default withRouter(LeftNav);
