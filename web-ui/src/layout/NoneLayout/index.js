import { Suspense } from "react";
import { Outlet } from "react-router-dom";
export default function NoneLayout() {
  return (
    <Suspense fallback={<h1>App is Loading</h1>}>
      <Outlet />
    </Suspense>
  );
}
