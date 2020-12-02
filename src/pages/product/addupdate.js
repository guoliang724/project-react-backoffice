import React, { Component } from "react";
import { Card, Form, Input, Button, Cascader, Upload } from "antd";
import LinkButton from "../../components/linkbutton";
import { ArrowLeftOutlined } from "@ant-design/icons";
const { Item } = Form;
const { TextArea } = Input;

export default class ProductAddUpdate extends Component {
  render() {
    const title = (
      <span>
        <LinkButton>
          <ArrowLeftOutlined />
        </LinkButton>
        <span>Add Product</span>
      </span>
    );
    return (
      <Card title={title}>
        <Form>
          <Item>
            <Input />
          </Item>
        </Form>
      </Card>
    );
  }
}
