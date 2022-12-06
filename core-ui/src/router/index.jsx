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
import { AiFillHome } from "react-icons/ai";
import { BsFillCpuFill } from "react-icons/bs";
import { MqttProvider } from "apis";

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
        title: "Home",
        category: "Overview",
        Icon: AiFillHome,
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
    children: [{ index: true, element: <Home /> }],
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
