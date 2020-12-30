import React, { Component } from "react";
import "./index.css";
import logo from "../../assets/images/logo.png";
import { Link, withRouter } from "react-router-dom";
import { Menu } from "antd";
import { manueList } from "../../config/leftManue";
import memory from "../../utils/memory";

const { SubMenu } = Menu;

class LeftNav extends Component {
  //determine the current user's auth to route
  hasAuth = (item) => {
    const { key, isPublic } = item;
    const menus = memory.user.role.menus;
    const username = memory.user.username;
    if (username === "admin" || isPublic || menus.indexOf(key) !== -1)
      return true;
    else if (item.children) {
      return !!item.children.find((child) => menus.indexOf(child.key) !== -1);
    }
    return false;
  };
  getNodes = (list) => {
    return list.map((item) => {
      //when it has relative authority to browse some components
      if (this.hasAuth(item)) {
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
      } else return undefined;
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
