import React, { Component } from "react";
import { Card, Button, Table, Modal, message } from "antd";
import { reqRoles, reqAddRole, reqUpdateRole } from "../../api/index";
import AddForm from "./addform";
import UpdateForm from "./updateform";
import memory from "../../utils/memory";
import getDate from "../../utils/formateDate";
export default class Role extends Component {
  constructor() {
    super();
    this.state = {
      roles: [],
      role: {},
      isShowAdd: false,
      isShowUpdate: false,
    };
    this.initialColumns();
  }

  onRow = (role) => {
    return {
      onClick: (event) => {
        this.setState({ role });
      },
    };
  };
  getRoles = async () => {
    const result = await reqRoles();
    if (result.data.status === 0) {
      const roles = result.data.data;

      this.setState({ roles });
    }
  };
  addRole = async () => {
    //collect the data
    const result = await this.form.validateFields();
    //if pass the validation
    if (!result.errorFields) {
      this.setState({ isShowAdd: false });
      this.form.resetFields();
      //add role
      const addResult = await reqAddRole(result.role);
      if (addResult.data.status === 0) {
        //success
        message.success("Success!");

        const role = addResult.data.data;

        this.setState({ roles: [...this.state.roles, role] });
      } else {
        message.error("Failed");
      }
    }
  };
  //update role in the backend database
  updateRole = async () => {
    this.setState({ isShowUpdate: false });
    const role = this.state.role;
    //update the author name and time
    role.auth_name = memory.user.username;
    role.auth_time = Date.now();
    // //get the value from children componet
    // const menus = this.refForm.current.getMenus();
    // role.menus = menus;
    //request to update
    const result = await reqUpdateRole(role);

    if (result.data.status === 0) {
      message.success("success!");
      this.getRoles();
    } else {
      message.error("Failed");
    }
  };
  initialColumns = () => {
    this.columns = [
      {
        title: "Role",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Create Time",
        dataIndex: "create_time",
        key: "create_time",
        render: getDate,
      },
      {
        title: "Authorization Time",
        dataIndex: "auth_time",
        render: getDate,
      },
      {
        title: "Autorizor",
        dataIndex: "auth_name",
        key: "auth_name",
      },
    ];
  };
  //update role in the child componet
  childUpdateRole = (role) => {
    this.setState({ role });
  };
  componentDidMount = async () => {
    await this.getRoles();
  };
  render() {
    const { roles, role, isShowAdd, isShowUpdate } = this.state;

    const title = (
      <span>
        <Button
          type="primary"
          onClick={() => {
            this.setState({ isShowAdd: true });
          }}
          style={{ marginRight: 20 }}
        >
          Create Roles
        </Button>
        <Button
          type="primary"
          disabled={!role._id}
          onClick={() => {
            this.setState({ isShowUpdate: true });
          }}
        >
          Set Roles
        </Button>
      </span>
    );
    return (
      <div>
        <Card title={title}>
          <Table
            rowKey="_id"
            bordered
            columns={this.columns}
            dataSource={roles}
            pagination={{ defaultPageSize: 5 }}
            rowSelection={{
              type: "radio",
              selectedRowKeys: [role._id],
            }}
            onRow={this.onRow}
          />
          <Modal
            title="Add Role"
            visible={isShowAdd}
            onOk={this.addRole}
            onCancel={() => {
              this.setState({ isShowAdd: false });
              this.form.resetFields();
            }}
          >
            <AddForm
              setForm={(form) => {
                this.form = form;
              }}
            />
          </Modal>
          <Modal
            title="Update Role"
            visible={isShowUpdate}
            onOk={this.updateRole}
            onCancel={() => {
              this.setState({ isShowUpdate: false });
            }}
          >
            <UpdateForm childUpdateRole={this.childUpdateRole} role={role} />
          </Modal>
        </Card>
      </div>
    );
  }
}
