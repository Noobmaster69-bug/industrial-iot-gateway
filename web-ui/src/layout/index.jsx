import { Suspense } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import SideBarLayout from "./SideBarLayout";
export default function Layout() {
  const data = useLoaderData();
  switch (data.layout || "") {
    case "sidebar":
      return <SideBarLayout {...data} />;
    default:
      return (
        <Suspense fallback={<div></div>}>
          <main style={{ overflow: "hidden" }}>
            <Outlet />
          </main>
        </Suspense>
      );
  }
}
