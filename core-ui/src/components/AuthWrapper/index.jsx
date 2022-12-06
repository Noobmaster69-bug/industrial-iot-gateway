import { useLocation, useNavigate, useMatches } from "react-router-dom";
import { useEffect } from "react";
import { useGetAuth } from "apis";
import { Forbidden, Loading } from "components/ErrorPages";
export function AuthorizeWrapper({ children }) {
  const fullRoles = ["admin"];
  const {
    data: { role },
  } = useGetAuth();
  const matches = useMatches();
  const loaderData = matches[matches.length - 1]?.data;
  const includedRoles = loaderData?.includedRoles || fullRoles;

  if (includedRoles.some((Role) => role === Role)) {
    return children;
  } else {
    return <Forbidden />;
  }
}

export default function AuthWrapper({ children }) {
  const { data, isLoading, isFetching } = useGetAuth();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoading) {
      if (data?.isAuth === true) {
        //navigate to user home if user on "/login"  or "/" path
        if (location.pathname === "/login") {
          console.log("redirect to home");
          navigate("/home");
        }
      } else if (data?.isAuth === false) {
        if (location.pathname !== "/login") {
          navigate("/login");
        }
      }
    }
  }, [data?.isAuth, isLoading, location.pathname, navigate]);
  if (isLoading || isFetching) {
    return <Loading />;
  } else {
    return children;
  }
}
