import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { errorToast, successToast } from "utilities";
import { axios } from "utilities";
export function useAllDevices() {
  return useQuery(
    ["devices"],
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
export function useDevices(id) {
  return useQuery(
    ["devices", id],
    async ({ queryKey }) => {
      const id = queryKey[1];
      console.log(id);
      const data = await axios
        .get("/devices/", { params: { id } })
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
    ["devices"],
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
        queryClient.invalidateQueries(["devices"]);
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
    ["devices"],
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
        queryClient.invalidateQueries(["devices"]);
      },
      onError: (error, variables, context) => {
        errorToast(error.response?.data);
      },
    }
  );
}
export function useDeviceCount() {
  return useQuery(
    ["devices-count"],
    async () => {
      const data = await axios.get("/devices/count").then(({ data }) => data);
      return data;
    },
    {
      staleTime: 60000,
    }
  );
}
export function useEditDevice(id) {
  const queryClient = useQueryClient();
  return useMutation(
    async (data) => {
      const device = await axios
        .post("/devices/", { ...data })
        .then(({ data }) => data);
      return device;
    },
    {
      onSuccess: () => {
        successToast("Success");
        queryClient.invalidateQueries(["devices", id]);
      },
      onError: (error, variables, context) => {
        errorToast(error.response?.data);
      },
    }
  );
}
