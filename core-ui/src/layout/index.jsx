import { useLoaderData } from "react-router-dom";
import TopSideBarLayout from "./TopSideBarLayout";
import NoneLayout from "./NoneLayout";

export default function Layout() {
  const layoutData = useLoaderData();
  switch (layoutData?.layout) {
    case "top-side-bar":
      return <TopSideBarLayout />;

    default:
      return <NoneLayout />;
  }
}
