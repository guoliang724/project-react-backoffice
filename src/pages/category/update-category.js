import React, { Component } from "react";
import { Form, Input } from "antd";

export default class UpdateCategory extends Component {
  UpdateRef = React.createRef();
  componentDidUpdate = () => {
    this.UpdateRef.current.setFieldsValue({
      categoryName: this.props.categoryName,
    });
  };
  render() {
    const { Item } = Form;
    this.props.propsfunc(this.UpdateRef);
    const { categoryName } = this.props;
    return (
      <Form ref={this.UpdateRef}>
        <Item
          name="categoryName"
          initialValue={categoryName}
          rules={[{ required: true, message: "Please input" }]}
        >
          <Input name="categoryName" />
        </Item>
      </Form>
    );
  }
}
