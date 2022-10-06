import Axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Toast } from "hooks";
const axios = Axios.create({
  baseURL: "http://localhost:33333/api",
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});
function errorToast(msg) {
  const toast = Toast("error");
  toast(msg);
}
function successToast(msg) {
  const toast = Toast("success");
  toast(msg);
}
export function useDevices() {
  return useQuery(
    "devices",
    async () => {
      const data = await axios
        .get("/devices/all")
        .then(({ data }) => data)
        .catch((err) => console.log(JSON.stringify(err)));
      return data;
    },
    {
      staleTime: 60000,
    }
  );
}
export function useCreateDevice({ onSuccess = () => {} }) {
  const queryClient = useQueryClient();
  return useMutation(
    "devices",
    async (data) => {
      const device = await axios
        .post("/devices/", { ...data })
        .then(({ data }) => data);
      return device;
    },
    {
      onSuccess: () => {
        onSuccess();
        successToast("Success");
        queryClient.invalidateQueries("devices");
      },
      onError: (error, variables, context) => {
        errorToast(error.response?.data);
      },
    }
  );
}
export function useDeleteDevice(onSuccess = () => {}) {
  const queryClient = useQueryClient();
  return useMutation(
    "devices",
    async (id) => {
      const data = await axios
        .delete("/devices/", { params: { id } })
        .then(({ data }) => data);
      return data;
    },
    {
      staleTime: 60000,
      onSuccess: () => {
        onSuccess();
        successToast("Success");
        queryClient.invalidateQueries("devices");
      },
      onError: (error, variables, context) => {
        errorToast(error.response?.data);
      },
    }
  );
}
export function useDeviceCount() {
  return useQuery(
    "devices-count",
    async () => {
      const data = await axios.get("/devices/count").then(({ data }) => data);
      return data;
    },
    {
      staleTime: 60000,
    }
  );
}
