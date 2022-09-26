import Home from "pages/Home";
import Login from "pages/Login";
import { lazy } from "react";
import {
  AiFillHome,
  AiOutlineApartment,
  AiTwotoneReconciliation,
} from "react-icons/ai";
import { BsFillCpuFill } from "react-icons/bs";
// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    path: "/login",
    component: () => <Login />,
    layout: null,
    layoutProps: "",
    navBar: false,
  },
  {
    path: "/overview",
    component: () => <Home />,
    layout: "SideBar",
    layoutProps: {
      title: "Overview",
      icon: (x) => (
        <AiFillHome size={x} style={{ marginRight: "8px", fill: "#262626" }} />
      ),
    },
    icon: <AiFillHome size={20} />,
    Icon: ({ size, fill }) => <AiFillHome size={size} fill={fill} />,
    label: "Overview",
    type: "GENERAL",
  },
  {
    path: "/devices",
    component: lazy(() => import("pages/Devices")),
    layout: "SideBar",
    layoutProps: {
      title: "Devices",
      icon: (x) => (
        <BsFillCpuFill
          size={x}
          style={{ marginRight: "8px", fill: "#262626" }}
        />
      ),
    },
    icon: <BsFillCpuFill size={20} />,
    Icon: ({ size, fill }) => <BsFillCpuFill size={size} fill={fill} />,
    label: "Devices",
    type: "MANAGEMENT",
  },
  // {
  //   path: "/models",
  //   component: "pages/Models",
  //   layout: "SideBar",
  //   layoutProps: {
  //     title: "Models",
  //     icon: (x) => (
  //       <BsFillCpuFill
  //         size={x}
  //         style={{ marginRight: "8px", fill: "#262626" }}
  //       />
  //     ),
  //   },
  //   icon: <AiTwotoneReconciliation size={20} />,
  //   label: "Models",
  //   type: "MANAGEMENT",
  // },
  // {
  //   path: "/task-management",
  //   component: "pages/Models",
  //   layout: "SideBar",
  //   layoutProps: {
  //     title: "Models",
  //     icon: (x) => (
  //       <BsFillCpuFill
  //         size={x}
  //         style={{ marginRight: "8px", fill: "#262626" }}
  //       />
  //     ),
  //   },
  //   icon: <AiTwotoneReconciliation size={20} />,
  //   label: "Tasks",
  //   type: "MANAGEMENT",
  // },
  // {
  //   path: "/services-management",
  //   component: "pages/Models",
  //   layout: "SideBar",
  //   layoutProps: {
  //     title: "Models",
  //     icon: (x) => (
  //       <BsFillCpuFill
  //         size={x}
  //         style={{ marginRight: "8px", fill: "#262626" }}
  //       />
  //     ),
  //   },
  //   icon: <AiOutlineApartment size={20} />,
  //   label: "Services",
  //   type: "MANAGEMENT",
  // },
];
