/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { reqTime, reqWeather } from "../../api/index";
import memory from "../../utils/memory";
import storage from "../../utils/storage";
import "./index.css";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { manueList } from "../../config/leftManue";
import LinkButton from "../linkbutton";

class Header extends Component {
  state = {
    main: "",
    description: "",
    currentTime: reqTime(Date.now()),
    city: "Calgary",
  };
  getTime = () => {
    this.intervalId = setInterval(() => {
      const timeNow = reqTime(Date.now());
      this.setState({
        currentTime: timeNow,
      });
    }, 1000);
  };
  getUser = () => {
    return memory.user !== {} ? memory.user.username : " ";
  };
  getWeather = async () => {
    const result = await reqWeather(this.state.city);
    const { main, description } = result.weather[0];
    this.setState({
      main,
      description,
    });
  };
  getTitle = () => {
    const path = this.props.location.pathname;
    let title;
    manueList.forEach((item) => {
      if (item.children) {
        const citem = item.children.find(
          (citem) => path.indexOf(citem.key) === 0
        );
        if (citem) title = citem.content;
      } else {
        if (item.path === path) title = item.content;
      }
    });

    return title;
  };
  getCancel = () => {
    Modal.confirm({
      icon: <ExclamationCircleOutlined />,
      content: "Do you want to logout?",
      onOk: () => {
        storage.RemoveUser();
        memory.user = {};
        this.props.history.push("/login");
      },
    });
  };
  componentDidMount() {
    this.getTime();
    this.getWeather();
  }
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }
  render() {
    const { main, description, currentTime } = this.state;
    const title = this.getTitle();
    const username = this.getUser();
    return (
      <div className="header">
        <div className="header-top">
          <span>Welcome {username}</span>
          <LinkButton onClick={this.getCancel}>Exit</LinkButton>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{title}</div>
          <div className="header-bottom-right">
            <span>{this.state.city}</span>
            <span>{currentTime}</span>
            <span>{main}</span>
            <span>{description}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
