import { axios } from "utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
async function getAuth() {
  let TOKEN = window.localStorage.getItem("TOKEN");
  if (TOKEN !== null) {
    axios.defaults.headers.common["Authorization"] = TOKEN;
    try {
      const { data } = await axios.get("/auth");
      return { isAuth: true, ...data };
    } catch (err) {
      delete axios.defaults.headers.common["Authorization"];
      return { isAuth: false };
    }
  }
  window.localStorage.removeItem("TOKEN");
  return { isAuth: false };
}
export function useGetAuth() {
  return useQuery(["auth"], getAuth, {
    staleTime: Infinity,
  });
}
async function logIn(userData) {
  const {
    data: { accessToken },
  } = await axios.post("/auth/", userData);
  console.log("test");
  window.localStorage.setItem("TOKEN", "Bearer " + accessToken);
  axios.defaults.headers.common["Authorization"] = accessToken;
  return "login";
}
export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation(logIn, {
    onSuccess() {
      queryClient.invalidateQueries(["auth"]);
    },
  });
}
export function logOut() {
  window.localStorage.removeItem("TOKEN");
}
export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation(logOut, {
    onSuccess() {
      queryClient.invalidateQueries(["auth"]);
    },
  });
}
