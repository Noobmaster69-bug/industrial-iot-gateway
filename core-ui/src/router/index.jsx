import Layout from "layout";
import Login from "pages/Login";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
  useRouteError,
} from "react-router-dom";
import AuthWrapper from "components/AuthWrapper";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "pages/Home";
import { AiFillSchedule, AiOutlineMonitor } from "react-icons/ai";
import { BsFillCpuFill } from "react-icons/bs";
import { FaUserCog } from "react-icons/fa";

import { MqttProvider } from "apis";
import Devices from "pages/Devices";
import AddDevice from "pages/Devices/AddDevice";
import Detail from "pages/Devices/Detail";
import Tasks from "pages/Schedules";
import ScheduleDetail from "pages/Schedules/Detail";
import Users from "pages/Users";
import AddSchedule from "pages/Schedules/AddSchedule";

const queryClient = new QueryClient({
  logger: {
    error: () => {},
    ...console,
  },
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      onError: function (err) {
        // go to login page if section end
        if (err.message.code === 401) {
          if (window.location.pathname !== "/login") {
            window.location.href = "/login";
          }
        }
      },
    },
  },
});

export const routes = [
  {
    path: "/home",
    element: <Layout />,
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
  {
    path: "/devices",
    element: <Layout />,
    loader: () => {
      return {
        layout: "top-side-bar",
        title: "Devices",
        category: "Management",
        Icon: BsFillCpuFill,
      };
    },
    children: [
      { index: true, element: <Devices /> },
      {
        path: "new",
        element: <AddDevice />,
      },
      {
        path: ":id",
        element: <Detail />,
      },
    ],
  },
  {
    path: "/schedules",
    element: <Layout />,
    loader: () => {
      return {
        layout: "top-side-bar",
        title: "Schedules",
        category: "Management",
        Icon: AiFillSchedule,
      };
    },
    children: [
      { index: true, element: <Tasks /> },
      { path: ":id", element: <ScheduleDetail /> },
      {
        path: "new",
        element: <AddSchedule />,
      },
    ],
  },
  {
    path: "/users",
    element: <Layout />,
    loader: () => {
      return {
        layout: "top-side-bar",
        title: "Users",
        category: "Management",
        Icon: FaUserCog,
      };
    },
    children: [{ index: true, element: <Users /> }],
  },
];

export const RoutesWrapper = [
  {
    path: "/",
    element: (
      <QueryClientProvider client={queryClient}>
        <AuthWrapper>
          <MqttProvider>
            <Outlet />
          </MqttProvider>
          <ReactQueryDevtools />
        </AuthWrapper>
      </QueryClientProvider>
    ),

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
  return <RouterProvider router={createBrowserRouter(RoutesWrapper)} />;
}
