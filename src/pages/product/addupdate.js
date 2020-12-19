import React, { Component } from "react";
import { Card, Form, Input, Button, Cascader, Upload, message } from "antd";
import LinkButton from "../../components/linkbutton";
import { ArrowLeftOutlined } from "@ant-design/icons";
import {
  reqCategorys,
  reqCategoryName,
  reqAddOrUpdateProduct,
} from "../../api/index";
import PicturesWall from "./pictureswall";
import RichTextEditor from "./richtexteditor";
const { Item } = Form;
const { TextArea } = Input;

export default class ProductAddUpdate extends Component {
  refForm = React.createRef();
  refPictureWall = React.createRef();
  refRicchText = React.createRef();
  state = {
    options: [],
    product: {},
    isUpdate: false, //label it to know if it is a update or an add
  };

  sumbit = async () => {
    //varifying data
    const imgs = await this.refPictureWall.current.getImgs();
    const detail = this.refRicchText.current.getDetail();
    const result = await this.refForm.current.validateFields();
    result.imgs = imgs;
    result.detail = detail;
    if (result.category.length === 1) {
      result.pCategoryId = "0";
      result.categoryId = result.category[0];
    } else {
      result.pCategoryId = result.category[0];
      result.categoryId = result.category[1];
    }
    if (result.errorFields) {
      message.warn("Input is not correct!");
    } else {
      //add or update
      if (this.state.isUpdate) {
        result._id = this.state.product._id;
      }

      const response = await reqAddOrUpdateProduct(result);
      if (response.data.status === 0) {
        message.success("Success!");
        this.props.history.goBack();
      } else {
        message.error("Add Failed!");
      }
    }
  };
  loadData = async (selectdOptions) => {
    const targetOption = selectdOptions[0];
    targetOption.loading = true;

    //obtain the second level categories based on the selected category
    const subCategories = await this.getCategories(targetOption.value);
    targetOption.loading = false;
    if (subCategories && subCategories.length > 0) {
      const childOptions = subCategories.map((c) => ({
        value: c._id,
        label: c.name,
        isLeaf: true,
      }));

      targetOption.children = childOptions;
    } else {
      //the seleceted category doesn't have a subcategory
      targetOption.isLeaf = true;
    }
    this.setState({ options: [...this.state.options] });
  };
  //obtain the first level or second level categories
  getCategories = async (parentId) => {
    const result = await reqCategorys(parentId);

    if (result.data.status === 0) {
      const categories = result.data.data;
      //if it is the first category
      if (parentId === "0") await this.initOptions(categories);
      else {
        // the secondary category
        return categories;
      }
    }
  };
  //initialize options
  initOptions = async (categories) => {
    const options = categories.map((c) => ({
      value: c._id,
      label: c.name,
      isLeaf: false,
    }));
    this.setState({ options });
  };
  //update form values
  updateFormValues = async ({ name, desc, price, pCategoryId, categoryId }) => {
    let parentCategory;
    let childcategory;
    let category;
    if (pCategoryId === "0") {
      parentCategory = await reqCategoryName(categoryId);
      category = [parentCategory.data.data.name];
    } else {
      parentCategory = await reqCategoryName(pCategoryId);
      childcategory = await reqCategoryName(categoryId);
      category = [parentCategory.data.data.name, childcategory.data.data.name];
    }

    this.refForm.current.setFieldsValue({
      name,
      desc,
      price,
      category: category,
    });
  };

  componentWillMount = () => {
    this.getCategories("0");
    const product = this.props.location.state;
    //label it to know if it is update or add
    const isUpdate = !!product;

    this.setState({ product, isUpdate });
  };
  componentDidMount = async () => {
    //if it is the update form, then insert needed information in input box
    if (this.state.isUpdate) {
      await this.updateFormValues(this.state.product);
    }
  };
  render() {
    const title = (
      <span>
        <LinkButton
          onClick={() => {
            this.props.history.goBack();
          }}
        >
          <ArrowLeftOutlined />
        </LinkButton>
        <span>{this.state.isUpdate ? "Modify Product" : "Add Product"}</span>
      </span>
    );
    const { options, product } = this.state;
    const imgs = (product && product.imgs) || [];
    const detail = (product && product.detail) || "";

    return (
      <Card title={title}>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 8 }}
          ref={this.refForm}
        >
          <Item
            label="Product Name"
            name="name"
            rules={[{ required: true, message: "Cannot be empty" }]}
          >
            <Input placeholder="Please Input Product Name" />
          </Item>
          <Item
            name="desc"
            label="Description"
            rules={[{ required: true, message: "Cannot be empty" }]}
          >
            <TextArea
              placeholder="Please Input Product Desciption"
              autoSize={{ minRows: 2, maxRows: 6 }}
            />
          </Item>
          <Item
            name="price"
            label="Product Price"
            rules={[{ required: true, message: "Cannot be empty" }]}
          >
            <Input
              type="number"
              placeholder="Please Input Product Price"
              addonAfter="Dollar"
            />
          </Item>
          <Item
            label="Category"
            name="category"
            rules={[
              {
                required: true,
                pattern: /\d/,
                message: "Please Select One Category",
              },
            ]}
          >
            <Cascader
              name="category"
              options={options}
              loadData={this.loadData}
              changeOnSelect
            />
          </Item>
          <Item label="Images" name="images">
            <PicturesWall ref={this.refPictureWall} imgs={imgs} />
          </Item>
          <Item
            label="Detail"
            name="detail"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 18 }}
          >
            <RichTextEditor ref={this.refRicchText} detail={detail} />
          </Item>
          <Button
            style={{ marginLeft: 130 }}
            type="primary"
            htmlType="submit"
            onClick={this.sumbit}
          >
            Submit
          </Button>
        </Form>
      </Card>
    );
  }
}
