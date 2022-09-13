import { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import router from "./constants/router";
import Layout from "layout";

function App() {
  return (
    <Routes>
      <Route index element={<Navigate to="devices" />}></Route>
      {router.map((route, index) => {
        const Element = lazy(() => import(`${route.component}`));
        return (
          <Route
            element={<Layout type={route.layout} props={route.layoutProps} />}
            key={"App router" + index}
            path={route.path}
          >
            <Route index element={<Element />} />
            <Route element={<Element />} path="*" />
          </Route>
        );
      })}
    </Routes>
  );
}

export default App;
