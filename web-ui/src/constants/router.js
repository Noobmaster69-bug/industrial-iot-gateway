import {
  AiFillHome,
  AiOutlineApartment,
  AiTwotoneReconciliation,
} from "react-icons/ai";
import { BsFillCpuFill } from "react-icons/bs";
// eslint-disable-next-line import/no-anonymous-default-export
export default [
  // {
  //   path: "",
  //   component: "pages/Login",
  //   layout: null,
  //   layoutProps: "",
  //   navBar: false,
  // },
  {
    path: "/home",
    component: "pages/Home",
    layout: "SideBar",
    layoutProps: { title: "Home" },
    icon: <AiFillHome size={25} />,
    label: "Home",
  },
  {
    path: "/devices",
    component: "pages/Devices",
    layout: "SideBar",
    layoutProps: { title: "Devices" },
    icon: <BsFillCpuFill size={25} />,
    label: "Devices",
  },
  {
    path: "/models",
    component: "pages/Models",
    layout: "SideBar",
    layoutProps: { title: "Models" },
    icon: <AiTwotoneReconciliation size={25} />,
    label: "Models",
  },
  // {
  //   path: "/task-management",
  //   component: "pages/Task",
  //   layout: "SideBar",
  //   layoutProps: "",
  //   icon: <AiTwotoneReconciliation size={25} />,
  //   label: "Task Management",
  // },
  // {
  //   path: "/services-management",
  //   component: "pages/ServicesMGMT",
  //   layout: "SideBar",
  //   layoutProps: "",
  //   icon: <AiOutlineApartment size={25} />,
  //   label: "Services Management",
  // },
];
