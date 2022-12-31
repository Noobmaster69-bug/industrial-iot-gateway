import ErrorPage from "components/Errors/ErrorPage";
import Layout from "layouts";
import Login from "pages/Login";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import routes from "./routes";

export const RoutesWrapper = [
  {
    path: "/",
    element: <Outlet />,

    loader: () => {
      return {
        title: "App",
      };
    },
    children: [
      {
        index: true,
        element: <Navigate to="/login" />,
      },
      {
        path: "/login",
        element: <Layout />,
        children: [
          {
            index: true,
            element: <Login />,
          },
        ],
      },
      ...routes,
    ],
    errorElement: <ErrorPage />,
  },
];

export default function BrowserRouterProvider() {
  return <RouterProvider router={createBrowserRouter(RoutesWrapper)} />;
}
