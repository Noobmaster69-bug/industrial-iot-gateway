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
    component: "pages/Login",
    layout: null,
    layoutProps: "",
    navBar: false,
  },
  {
    path: "/home",
    component: "pages/Home",
    layout: "SideBar",
    layoutProps: { title: "Overview" },
    icon: <AiFillHome size={20} />,
    label: "Overview",
    type: "GENERAL",
  },
  {
    path: "/devices",
    component: "pages/Devices",
    layout: "SideBar",
    layoutProps: { title: "Devices" },
    icon: <BsFillCpuFill size={20} />,
    label: "Devices",
    type: "MANAGEMENT",
  },
  {
    path: "/models",
    component: "pages/Models",
    layout: "SideBar",
    layoutProps: { title: "Models" },
    icon: <AiTwotoneReconciliation size={20} />,
    label: "Models",
    type: "MANAGEMENT",
  },
  {
    path: "/task-management",
    component: "pages/Models",
    layout: "SideBar",
    layoutProps: "",
    icon: <AiTwotoneReconciliation size={20} />,
    label: "Tasks",
    type: "MANAGEMENT",
  },
  {
    path: "/services-management",
    component: "pages/Models",
    layout: "SideBar",
    layoutProps: "",
    icon: <AiOutlineApartment size={20} />,
    label: "Services",
    type: "MANAGEMENT",
  },
];
