import { lazy, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

import router from "constants/router";
import Layout from "layout";
import { useUser } from "hooks/api";
function App() {
  const { data: user, isFetched, isFetching } = useUser();
  // const nevigate = useNavigate();
  // const location = useLocation();
  if (isFetching) {
    return <div></div>;
  }
  return (
    <Routes>
      <Route index element={<Navigate to="login" />}></Route>
      {router.map((route, index) => {
        const Element = route.component;
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
