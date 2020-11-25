import React, { Component } from "react";
import { Form, Input } from "antd";

export default class UpdateCategory extends Component {
  refInput = React.createRef();
  componentDidUpdate = () => {
    this.refInput.current.setFieldsValue({
      input: this.props.categoryName,
    });
  };
  render() {
    const { Item } = Form;
    this.props.propsfunc(this.refInput);
    const { categoryName } = this.props;
    return (
      <Form ref={this.refInput}>
        <Item name="categoryName" initialValue={categoryName}>
          <Input name="categoryName" />
        </Item>
      </Form>
    );
  }
}
