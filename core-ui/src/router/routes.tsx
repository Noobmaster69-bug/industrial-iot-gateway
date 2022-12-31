import { RouteObject } from "react-router-dom";
import Layouts from "layouts";
import Home from "pages/Home";
import { AiOutlineMonitor } from "react-icons/ai";
const routes: RouteObject[] = [
  {
    path: "/home",
    element: <Layouts />,
    loader: () => {
      return {
        layout: "top-side-bar",
        title: "System",
        category: "Overview",
        Icon: AiOutlineMonitor,
      };
    },
    children: [{ index: true, element: <Home /> }],
  },
];

export default routes;
