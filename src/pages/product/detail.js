import React, { Component } from "react";
import { Card, List } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import LinkButton from "../../components/linkbutton";
const { Item } = List;
export default class ProductDetail extends Component {
  render() {
    const { name, desc, price, detail, imgs } = this.props.location.state;
    const title = (
      <span>
        <LinkButton>
          <ArrowLeftOutlined
            style={{ marginRight: 15, fontSize: 20 }}
            onClick={() => {
              this.props.history.goBack();
            }}
          />
        </LinkButton>
        <span>Return to Product List</span>
      </span>
    );
    return (
      <Card title={title}>
        <List bordered className="product-detail">
          <Item>
            <span className="left">Product Name:</span>
            <span className="right">{name}</span>
          </Item>
          <Item>
            <span className="left">Product Description:</span>
            <span>{desc}</span>
          </Item>
          <Item>
            <span className="left">Product Price:</span>
            <span>{price + "$"}</span>
          </Item>
          <Item>
            <span className="left">Product Images:</span>
            <span>
              {imgs.map((img) => (
                <img src={img} key={img} alt="img" className="product-img" />
              ))}
            </span>
          </Item>
          <Item>
            <span className="left">Product Detail:</span>
            <span dangerouslySetInnerHTML={{ __html: detail }}></span>
          </Item>
        </List>
      </Card>
    );
  }
}
