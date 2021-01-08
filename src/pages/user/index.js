import React, { useState, useEffect } from "react";
import { Table, Card, Modal, Button, message } from "antd";
import getDateFomat from "../../utils/formateDate";
import LinkButton from "../../components/linkbutton";
import {
  reqUsers,
  reqDeleteUsers,
  reqAdduser,
  reqUpdateUser,
} from "../../api/index";
import AddUser from "./adduser";
import UpdateUser from "./update";
export default function User(props) {
  //for add form component visibility
  const [visible, setVisible] = useState(false);
  //for update form component visibility
  const [visibleUpdate, setVisibleUpdate] = useState(false);
  //user selected in the modify function
  const [user, setUser] = useState();
  //users in the list
  const [users, setUsers] = useState([]);
  //to control the addform component data
  const [ref, setRef] = useState({});
  //to control the updateform component data
  const [refUpdate, setRafUpdate] = useState({});
  //to get roles information from database
  const [roles, setRoles] = useState([]);
  //selected a role and get its information
  const [roleNames, setRoleNames] = useState({});
  //antd table data source
  const columns = [
    {
      title: "userName",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Created Time",
      dataIndex: "create_time",
      render: getDateFomat,
    },
    {
      title: "Role",
      dataIndex: "role_id",
      render: (role_id) => roleNames[role_id],
    },
    {
      title: "Operate",
      render: (user) => (
        <span>
          <LinkButton
            onClick={() => {
              setVisibleUpdate(true);
              setUser(user);
            }}
          >
            Modify
          </LinkButton>
          <LinkButton
            onClick={() => {
              DeleteUser(user);
            }}
          >
            Delete
          </LinkButton>
        </span>
      ),
    },
  ];

  //optimize function
  function GetRoleNames(roles) {
    const rolenames = roles.reduce((pre, role) => {
      pre[role._id] = role.name;
      return pre;
    }, {});
    setRoleNames({ ...rolenames });
  }
  //add an user
  async function addAnUser() {
    const result = await reqAdduser(ref.current.getFieldsValue());
    if (result.data.status === 0) {
      message.success("add user success!");
      //reget users info and update
      const outcome = await reqUsers();
      if (outcome.data.status === 0) {
        setUsers(outcome.data.data.users);
      }
      ref.current.resetFields();
      setVisible(false);
    } else {
      message.error("something is wrong");
    }
  }
  //get user info from child component
  function getUserInfo(value) {
    setRef(value);
  }
  //get user update information from child component
  function getUserUpdateInfo(value) {
    setRafUpdate(value);
  }
  //to delete an user and update user infos
  function DeleteUser(user) {
    Modal.confirm({
      title: `Confirm to delete ${user.username}?`,
      onOk: async function () {
        const result = await reqDeleteUsers(user._id);
        if (result.data.status === 0) {
          message.success("Delete User Success!");
          //reget users info and update
          const outcome = await reqUsers();
          if (outcome.data.status === 0) {
            setUsers(outcome.data.data.users);
          }
        } else {
          message.error("Delete user Failed!");
        }
      },
      onCancel() {
        console.log("Cancle");
      },
    });
  }
  //to update an user infor
  async function updateUser(user) {
    const result = await reqUpdateUser(refUpdate.current.getFieldsValue());
    if (result.data.status === 0) {
      message.success("Update User Success!");
      //reget users info and update
      const outcome = await reqUsers();
      if (outcome.data.status === 0) {
        setUsers(outcome.data.data.users);
      }
      setVisibleUpdate(false);
    } else {
      message.error("Update User Failed!");
    }
  }
  useEffect(() => {
    reqUsers().then(
      (data) => {
        if (data.data.status === 0) {
          const users = data.data.data.users;
          const roles = data.data.data.roles;

          GetRoleNames(roles);

          setUsers(users);
          setRoles(roles);
        }
      },
      (error) => {
        message.error("No User Data!");
      }
    );
  }, [users.length]);
  const title = (
    <Button
      type="primary"
      onClick={() => {
        setVisible(true);
      }}
    >
      Create User
    </Button>
  );
  return (
    <Card title={title}>
      <Table
        rowKey="_id"
        bordered
        columns={columns}
        dataSource={users}
        pagination={{ defaultPageSize: 3 }}
      />
      <Modal
        title="Add User"
        visible={visible}
        onOk={addAnUser}
        onCancel={() => {
          setVisible(false);
          ref.current.resetFields();
        }}
      >
        <AddUser getUserInfo={getUserInfo} roles={roles} />
      </Modal>
      <Modal
        title="Update User"
        visible={visibleUpdate}
        onOk={updateUser}
        onCancel={() => {
          setVisibleUpdate(false);
        }}
      >
        <UpdateUser
          getUserUpdateInfo={getUserUpdateInfo}
          user={user}
          roles={roles}
        />
      </Modal>
    </Card>
  );
}
