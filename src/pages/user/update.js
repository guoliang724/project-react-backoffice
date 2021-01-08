import React, { useEffect, useRef } from "react";
import { Select, Form, Input } from "antd";

const { Item } = Form;
const { Option } = Select;
export default function UpdateUserForm(props) {
  const formRef = useRef();
  const { _id, username, email, role_id, phone } = props.user;
  const roles = props.roles.map((item) => (
    <Option key={item._id} value={item._id}>
      {item.name}
    </Option>
  ));
  //update user information at the mount period
  useEffect(() => {
    formRef.current.setFieldsValue({
      _id,
      username,
      email,
      phone,
      role_id,
    });
  }, [_id, username, phone, email, role_id]);
  //pass user input information to parent component
  useEffect(() => {
    props.getUserUpdateInfo(formRef);
  });
  return (
    <Form ref={formRef}>
      <Item
        name="_id"
        label="UserId"
        rules={[
          {
            required: true,
            message: "Cannot be Empty",
          },
        ]}
      >
        <Input />
      </Item>
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
