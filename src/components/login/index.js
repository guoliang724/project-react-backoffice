import React, { Component } from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons"
import {reqLogin } from "../../api/index"
import "./login.css";
import logo from "../../assets/images/logo.png";
import memory from "../../utils/memory"
import storage from "../../utils/storage"
import { Redirect } from "react-router-dom";


export default class Login extends Component {
  handleSubmit = async (values) => { 
    const { username, password } = values;
    const { data } = await reqLogin(username, password);
    if (data.status === 0) {
      message.success("success!");
      memory.user = data.data;
      storage.SetUser(data.data);
   
      this.props.history.replace("/");
    }
    else message.error("username or password is not correct!");
  }
  render() {
    if(memory.user&& memory.user._id) return <Redirect to="/"/> 
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo" />
          <h1>React Project: BackOffice</h1>
        </header>
        <section className="login-content">
          <h2>Login</h2>
          <Form onFinish={this.handleSubmit}> 
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="username"/>
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="password"/>
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" shape="round" size="large" htmlType="submit" block>
                Login
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    );
  }
}
