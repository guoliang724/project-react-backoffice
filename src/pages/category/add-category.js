import React, { Component } from "react";
import { Form, Select, Input } from "antd";
export default class AddCategory extends Component {
  refAdd = React.createRef();

  componentDidUpdate = () => {
    this.refAdd.current.setFieldsValue({
      parentId: this.props.parentId,
      categoryName: "",
    });
  };

  render() {
    const { Item } = Form;
    const { Option } = Select;
    const { categories, parentId } = this.props;
    this.props.propsfunc(this.refAdd);
    return (
      <Form ref={this.refAdd}>
        <Item initialValue={parentId} name="parentId">
          <Select name="parentId">
            <Option value="0">All Department</Option>
            {categories.map((item) => (
              <Option key={item._id} value={item._id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Item>
        <Item
          name="categoryName"
          rules={[{ required: true, message: "Input can not be empty" }]}
        >
          <Input placeholder="Please input the name of category" />
        </Item>
      </Form>
    );
  }
}
