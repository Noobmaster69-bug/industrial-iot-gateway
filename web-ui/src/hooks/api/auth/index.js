import Axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { Toast } from "hooks";
function errorToast(msg) {
  const toast = Toast("error");
  toast(msg);
}
// function successToast(msg) {
//   const toast = Toast("success");
//   toast(msg);
// }
export function useUser() {
  const nevigate = useNavigate();
  const location = useLocation();
  return useQuery(
    "user",
    async () => {
      const data = await Axios.get("http://localhost:33333/login", {
        withCredentials: true,
      }).then(({ data }) => data);
      if (data) {
        return data;
      }
      return undefined;
    },
    {
      staleTime: 2 * 3600 * 1000,
      retry: false,
      onSuccess: (data) => {
        if (data.isLogIn) {
          if (location.pathname === "/login") {
            nevigate("overview");
          }
        } else {
          if (location.pathname !== "/login") {
            window.location.href = "/login";
          }
        }
      },
    }
  );
}
export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ username, password }) => {
      const data = await Axios.post(
        "http://localhost:33333/login",
        {
          username,
          password,
        },
        { withCredentials: true }
      ).then(({ data }) => data);
      return data;
    },
    {
      staleTime: Number.MAX_VALUE,
      onSuccess: (data) => {
        queryClient.invalidateQueries(["user"]);
      },
      onError: (error, variables, context) => {
        errorToast(error.response?.data);
      },
    }
  );
}
export function useLogOut() {
  return useMutation(
    async () => {
      const data = await Axios.delete("http://localhost:33333/login", {
        withCredentials: true,
      });
      return data;
    },
    {
      mutationKey: "user",
      onSuccess: () => {
        window.location.href = "/login";
      },
    }
  );
}
