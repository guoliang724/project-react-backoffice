import React, { useState, useEffect, useRef } from "react";
import { Select, Form, Input } from "antd";

const { Item } = Form;
const { Option } = Select;
export default function AddUser(props) {
  const formRef = useRef();
  const roles = props.roles.map((item) => (
    <Option key={item._id} value={item._id}>
      {item.name}
    </Option>
  ));
  //pass user input information to parent component
  useEffect(() => {
    props.getUserInfo(formRef);
  });

  return (
    <Form ref={formRef}>
      <Item
        name="username"
        label="Username"
        rules={[
          {
            required: true,
            min: 2,
            message: "Cannot be Empty",
          },
        ]}
      >
        <Input />
      </Item>
      <Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            min: 2,
            message: "Cannot be Empty",
          },
        ]}
      >
        <Input type="password" />
      </Item>
      <Item
        name="phone"
        label="Phone"
        rules={[
          {
            required: true,
            min: 5,
            message: "Cannot be Empty",
          },
        ]}
      >
        <Input />
      </Item>
      <Item
        name="email"
        label="Email"
        rules={[
          {
            required: true,
            min: 2,
            message: "Cannot be Empty",
          },
        ]}
      >
        <Input />
      </Item>
      <Item
        name="role_id"
        label="Role"
        rules={[
          {
            required: true,
            message: "Cannot be Empty",
          },
        ]}
      >
        <Select>{roles}</Select>
      </Item>
    </Form>
  );
}
