import React, { Component } from "react";
import { Card, Button, Input, Select, Col, Table, message } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import {
  reqProducts,
  reqSearchProducts,
  reqUpdateStatus,
} from "../../api/index";
import LinkButton from "../../components/linkbutton";
import "./product.css";
const { Option } = Select;
export default class ProductHome extends Component {
  state = {
    total: null,
    products: [],
    defaultPageSize: 3,
    loading: true,
    searchContent: "",
    searchType: "productName",
  };

  InitialColum = () => {
    this.column = [
      {
        title: "Product Name",
        dataIndex: "name",
      },
      {
        title: "Product Description",
        dataIndex: "desc",
      },
      {
        title: "Price",
        dataIndex: "price",
        render: (price) => "CAD" + price,
      },
      {
        title: "Status",
        render: (product) => (
          <span>
            <Button
              type="primary"
              onClick={() => {
                this.updateStatus(product._id, product.status === 1 ? 2 : 1);
              }}
            >
              {product.status === 1 ? "On Shelves" : "OFF Shelves"}
            </Button>
            <span>{product.status === 1 ? "Avaliable" : "Out of Stock"}</span>
          </span>
        ),
      },
      {
        title: "Operate",
        render: (product) => (
          <span>
            <LinkButton
              onClick={() => {
                this.props.history.push("/product/detail", product);
              }}
            >
              Details
            </LinkButton>
            <LinkButton
              onClick={() => {
                this.props.history.push("/product/addupdate", product);
              }}
            >
              Modify
            </LinkButton>
          </span>
        ),
      },
    ];
  };
  GetProducts = async (pageNumber) => {
    this.pageNumber = pageNumber; //for further using
    this.setState({
      loading: true,
    });
    const { searchContent, searchType } = this.state;

    let result;
    //if there is something in the searchbox
    if (searchContent) {
      result = await reqSearchProducts(
        pageNumber,
        this.state.defaultPageSize,
        searchContent,
        searchType
      );
      //general data result
    } else {
      result = await reqProducts(pageNumber, this.state.defaultPageSize);
    }
    this.setState({
      loading: false,
    });

    if (result.data.status === 0) {
      //fetch the pagenation data and display data
      const { total, list } = result.data.data;

      this.setState({
        total,
        products: list,
      });
    }
  };
  updateStatus = async (productId, status) => {
    const result = await reqUpdateStatus(productId, status);

    if (result.data.status === 0) {
      message.success("Update product status Successfully");
      this.GetProducts(this.pageNumber);
    }
  };
  componentDidMount = () => {
    this.InitialColum();
    this.GetProducts(1);
  };

  render() {
    const {
      products,
      defaultPageSize,
      total,
      loading,
      searchContent,
      searchType,
    } = this.state;
    const title = (
      <span style={{ display: "flex", flexDirection: "row" }}>
        <Select
          value={searchType}
          style={{ marginRight: 10 }}
          onChange={(value) => {
            this.setState({ searchType: value });
          }}
        >
          <Option value="productName">Search By Name</Option>
          <Option value="productDesc">Search By Description</Option>
        </Select>
        <Col span={4} style={{ marginRight: 10 }}>
          <Input
            placeholder="Keyword"
            value={searchContent}
            onChange={(e) => {
              this.setState({ searchContent: e.currentTarget.value });
            }}
          />
        </Col>
        <Button
          type="primary"
          onClick={() => {
            this.GetProducts(1);
          }}
        >
          Search
        </Button>
      </span>
    );
    const extra = (
      <Button
        type="primary"
        icon={<PlusCircleOutlined />}
        onClick={() => this.props.history.push("/product/addupdate")}
      >
        Add Item
      </Button>
    );
    const conlumn = this.column;

    return (
      <Card title={title} extra={extra}>
        <Table
          pagination={{
            defaultPageSize: defaultPageSize,
            total,
            showQuickJumper: true,
            onChange: this.GetProducts,
          }}
          bordered
          loading={loading}
          rowKey="_id"
          columns={conlumn}
          dataSource={products}
        />
      </Card>
    );
  }
}
