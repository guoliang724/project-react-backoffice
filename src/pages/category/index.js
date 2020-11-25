import React, { Component } from "react";
import { Card, Table, Button, message, Modal } from "antd";
import { PlusCircleOutlined, ArrowRightOutlined } from "@ant-design/icons";
import LinkButton from "../../components/linkbutton";
import {
  reqCategorys,
  reqAddCategory,
  reqUpdateCategory,
} from "../../api/index";
import AddCategory from "./add-category";
import UpdateCategory from "./update-category";

export default class Category extends Component {
  state = {
    loading: false,
    categories: [],
    subCategories: [],
    parentId: "0",
    parentName: "",
    modalStatus: 0, //0 for visible,1 for adding, 2 for updating
  };
  getColumns = () => {
    return [
      {
        title: "Category Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Operation",
        width: 200,
        dataIndex: "",
        render: (category) => (
          <span>
            <LinkButton
              onClick={() => {
                this.showModalUpdate(category);
              }}
            >
              Modify
            </LinkButton>
            {this.state.parentId === "0" && (
              <LinkButton
                onClick={() => {
                  this.getSubCategories(category);
                }}
              >
                View
              </LinkButton>
            )}
          </span>
        ),
      },
    ];
  };
  getCategories = async () => {
    this.setState({
      loading: true,
    });
    const parentId = this.state.parentId;
    const result = await reqCategorys(parentId);
    if (result.data.status === 0) {
      if (parentId === "0")
        this.setState({
          categories: result.data.data,
        });
      else {
        this.setState({
          subCategories: result.data.data,
        });
      }
    } else {
      message.error("cannot get table inforamtion!");
    }
    this.setState({ loading: false });
  };
  getSubCategories = (category) => {
    this.setState({ parentId: category._id, parentName: category.name }, () => {
      this.getCategories();
    });
  };
  toCategories = () => {
    this.setState({
      parentId: "0",
      parentName: "",
      subCategories: [],
    });
    this.getCategories();
  };

  showModalAdd = () => {
    this.setState({
      modalStatus: 1,
    });
  };
  handleModalAdd = () => {};
  showModalUpdate = (category) => {
    this.category = category;

    this.setState({ modalStatus: 2 });
  };
  handleModalUpdate = async () => {
    //close the dialog
    this.setState({
      modalStatus: 0,
    });
    //prepare data
    const categoryId = this.category._id;
    const categoryName = this.refInput.current.getFieldValue("categoryName");
    //update data
    const result = await reqUpdateCategory({ categoryId, categoryName });
    //if successful, update rendering
    if (result.data.status === 0) {
      this.getCategories();
    }
  };
  handleCancel = () => {
    this.setState({
      modalStatus: 0,
    });
  };
  componentDidMount() {
    this.getCategories();
  }

  render() {
    const extra = (
      <span>
        <Button type="primary" onClick={this.showModalAdd}>
          <PlusCircleOutlined />
          Add
        </Button>
      </span>
    );
    const columns = this.getColumns();
    const category = this.category || {};

    const {
      categories,
      subCategories,
      loading,
      parentId,
      parentName,
      modalStatus,
    } = this.state;

    return (
      <Card
        title={
          this.state.parentId === "0" ? (
            "All Departments"
          ) : (
            <span>
              <LinkButton onClick={this.toCategories}>Category</LinkButton>
              <ArrowRightOutlined />
              <span style={{ marginLeft: "20px" }}>{parentName}</span>
            </span>
          )
        }
        extra={extra}
        style={{ width: "100%" }}
      >
        <Table
          bordered
          rowKey="_id"
          dataSource={parentId === "0" ? categories : subCategories}
          columns={columns}
          loading={loading}
          pagination={{ pageSize: 5, showQuickJumper: true }}
        />
        <Modal
          title="Add Category"
          visible={modalStatus === 1}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <AddCategory subCategories={subCategories} />
        </Modal>
        <Modal
          title="Update Category"
          visible={modalStatus === 2}
          onOk={this.handleModalUpdate}
          onCancel={this.handleCancel}
        >
          <UpdateCategory
            categoryName={category.name}
            propsfunc={(refInput) => {
              this.refInput = refInput;
            }}
          />
        </Modal>
      </Card>
    );
  }
}
