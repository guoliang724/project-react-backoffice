import React, { Component } from "react";
import { Form, Select, Input } from "antd";
export default class AddCategory extends Component {
  refUpdate = React.createRef();

  render() {
    const { Item } = Form;
    const { Option } = Select;
    const { subCategories } = this.props;
    return (
      <Form ref={this.refUpdate}>
        <Item>
          <Select>
            <Option value="0">All Department</Option>

            <Option>2</Option>
            <Option>3</Option>
          </Select>
        </Item>
        <Item>
          <Input placeholder="Please input the name of category" />
        </Item>
      </Form>
    );
  }
}
