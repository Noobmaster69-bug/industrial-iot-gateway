import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { errorToast } from "utilities";
import Axios from "axios";
const axios = Axios.create({
  baseURL: `${
    process.env.REACT_APP_BASE_URL || "http://localhost:33333"
  }/login`,
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});
export function useUser() {
  const queryClient = useQueryClient();
  return useQuery(
    ["user"],
    async () => {
      const data = await axios.get().then(({ data }) => data);
      if (data) {
        return data;
      }
      return { isLogIn: false };
    },
    {
      staleTime: 2 * 3600 * 1000,
      retry: false,
      onError: () => {
        queryClient.setQueryData(["user"], { isLogIn: false });
      },
    }
  );
}
export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ username, password }) => {
      const data = await axios
        .post("", {
          username,
          password,
        })
        .then(({ data }) => data);
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
      const data = await axios.delete();
      return data;
    },
    {
      onSuccess: () => {
        window.location.href = "/login";
      },
    }
  );
}
