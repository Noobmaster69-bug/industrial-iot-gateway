import NoneLayout from "./NoneLayout";
import SideBarLayout from "./SideBarLayout";
export default function Layout({ type, props }) {
  switch (type) {
    case "SideBar":
      return <SideBarLayout {...props} />;
    default:
      return <NoneLayout />;
  }
}
