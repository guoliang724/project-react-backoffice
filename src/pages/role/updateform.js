import React, { Component } from "react";
import { Form, Tree, Input } from "antd";
import { manueList } from "../../config/leftManue";
const { Item } = Form;

export default class UpdateForm extends Component {
  constructor(props) {
    super(props);

    this.treeData = [
      {
        title: "Authoriry",
        key: "all",
        children: this.getTreeNodes(manueList),
      },
    ];
  }

  //the call function after selected item
  onCheck = (checkedKeys) => {
    const role = { ...this.props.role, menus: checkedKeys };
    this.props.childUpdateRole(role);
  };
  getTreeNodes = (manueList) => {
    return manueList.reduce((pre, item) => {
      pre.push({
        title: item.content,
        key: item.key,
        children: item.children ? this.getTreeNodes(item.children) : null,
      });
      return pre;
    }, []);
  };

  render() {
    const { role } = this.props;
    const { menus } = role;
    const { treeData } = this;
    return (
      <Form>
        <Item label="Role Name">
          <Input value={role.name} disabled />
        </Item>

        <Item>
          <Tree
            checkable
            defaultExpandAll={true}
            checkedKeys={menus}
            treeData={treeData}
            onCheck={this.onCheck}
          ></Tree>
        </Item>
      </Form>
    );
  }
}
