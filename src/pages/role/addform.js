import React, { Component } from "react";
import { Form, Input } from "antd";

const { Item } = Form;
export default class AddForm extends Component {
  refForm = React.createRef();
  componentDidMount = async () => {
    this.props.setForm(this.refForm.current);
  };
  render() {
    return (
      <Form ref={this.refForm} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
        <Item
          label="Role Name"
          name="role"
          rules={[{ required: true, message: "Cannot be Empty" }]}
        >
          <Input placeholder="Please Input Role" />
        </Item>
      </Form>
    );
  }
}
