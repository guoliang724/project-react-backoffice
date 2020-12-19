import React, { useState, useEffect } from "react";
import { Table, Card, Modal, Button, message } from "antd";
import getDateFomat from "../../utils/formateDate";
import LinkButton from "../../components/linkbutton";
import { reqUsers } from "../../api/index";
export default function User(props) {
  const [visible, setVisible] = useState(false);
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [roleNames, setRoleNames] = useState({});
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
          <LinkButton>Modify</LinkButton>
          <LinkButton>Delete</LinkButton>
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
    setRoleNames(rolenames);
  }
  function AddorUpdate() {}
  useEffect(() => {
    reqUsers().then(
      (data) => {
        console.log("data", data);
        if (data.data.status === 0) {
          console.log("here");
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
  }, []);
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
        pagination={{ defaultPageSize: 5 }}
      />
      <Modal
        title="Add User"
        visible={visible}
        onOk={AddorUpdate}
        onCancel={() => {
          setVisible(false);
        }}
      ></Modal>
    </Card>
  );
}
