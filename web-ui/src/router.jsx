import Layout from "layout";
import Login from "pages/Login";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
  useRouteError,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Overview from "pages/Overview";
import { AiFillHome } from "react-icons/ai";
import { BsFillCpuFill } from "react-icons/bs";
import { SocketProvider } from "context";
import Devices from "pages/Devices";
import { lazy } from "react";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 2 * 3600 * 1000,
    },
    enable: true,
  },
});
const AddDevice = lazy(() => import("pages/Devices/AddDevice"));
const DeviceDetail = lazy(() => import("pages/Devices/Detail"));
const EditDevice = lazy(() => import("pages/Devices/EditDevice"));
export const routes = [
  {
    index: true,
    element: <Navigate to="/login" />,
  },
  {
    path: "/login",
    element: <Layout />,
    loader: async () => {
      return { layout: "none" };
    },
    children: [
      {
        index: true,
        element: <Login />,
      },
    ],
  },
  {
    path: "/overview",
    element: <Layout />,
    loader: function () {
      return {
        Icon: ({ size, fill }) => <AiFillHome size={size} fill={fill} />,
        title: "Overview",
        label: "Overview",
        type: "GENERAL",
        layout: "sidebar",
      };
    },
    children: [
      {
        index: true,
        element: <Overview />,
      },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: "/devices",
    element: <Layout />,
    loader: function () {
      return {
        Icon: ({ size, fill }) => <BsFillCpuFill size={size} fill={fill} />,
        title: "Devices",
        label: "Devices",
        type: "MANAGEMENT",
        layout: "sidebar",
      };
    },
    children: [
      {
        index: true,
        element: <Devices />,
      },

      {
        path: "new",
        element: <AddDevice />,
      },
      {
        path: ":id",
        element: <DeviceDetail />,
      },
      {
        path: ":id/edit",
        element: <EditDevice />,
      },
    ],
    errorElement: <ErrorPage />,
  },
];

export const RoutesWrapper = [
  {
    path: "/",
    element: (
      <SocketProvider>
        <Outlet />
      </SocketProvider>
    ),
    children: routes,
    errorElement: <ErrorPage />,
  },
];
export function ErrorPage() {
  const error = useRouteError();
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}

export default function BrowserRouterProvider() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={createBrowserRouter(RoutesWrapper)} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
