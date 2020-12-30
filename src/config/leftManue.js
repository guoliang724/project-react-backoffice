import {
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  ShoppingCartOutlined,
  HomeOutlined,
  UserOutlined,
  KeyOutlined,
  BarChartOutlined,
  LineChartOutlined,
  DotChartOutlined,
} from "@ant-design/icons";
import React from "react";
export const manueList = [
  {
    key: "/home",
    icon: <HomeOutlined />,
    path: "/home",
    content: "Home",
    isPublic: true,
  },
  {
    key: "sub1",
    icon: <ShoppingCartOutlined />,
    path: null,
    content: "Products",
    children: [
      {
        key: "/category",
        icon: <ContainerOutlined />,
        path: "/category",
        content: "Category",
      },
      {
        key: "/product",
        icon: <DesktopOutlined />,
        path: "/product",
        content: "Product",
      },
    ],
  },
  {
    key: "/user",
    icon: <UserOutlined />,
    path: "/user",
    content: "User",
  },
  {
    key: "/role",
    icon: <KeyOutlined />,
    path: "/role",
    content: "Role",
  },
  {
    key: "sub2",
    icon: <DotChartOutlined />,
    path: null,
    content: "Charts",
    children: [
      {
        key: "/charts/pie",
        icon: <PieChartOutlined />,
        path: "/charts/pie",
        content: "Pie Chart",
      },
      {
        key: "/charts/bar",
        icon: <BarChartOutlined />,
        path: "/charts/bar",
        content: "Bar Chart",
      },
      {
        key: "/charts/line",
        icon: <LineChartOutlined />,
        path: "/charts/line",
        content: "Line Chart",
      },
    ],
  },
];
