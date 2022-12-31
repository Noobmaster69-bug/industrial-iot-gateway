import { Outlet, useLoaderData } from "react-router-dom";
// import TopSideBarLayout from "./TopSideBarLayout";
import NoneLayout from "./NoneLayout";

export default function Layouts() {
  const layoutData = useLoaderData() as { layout?: string };
  switch (layoutData?.layout) {
    case "top-side-bar":
      //   return <TopSideBarLayout />;
      return <Outlet />;
    default:
      return <NoneLayout />;
  }
}
