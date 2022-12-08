import { axios, errorToast, successToast } from "utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

async function getAllDevices({ queryKey }) {
  // eslint-disable-next-line no-unused-vars
  const [_key, { start, limit, order, orderBy }] = queryKey;
  const { data } = await axios.get("/devices", {
    params: { start, limit, order, orderBy },
  });
  return data;
}
export function useAllDevices({ start, limit, order, orderBy }) {
  return useQuery({
    queryKey: ["devices", { start, limit, order, orderBy }],
    queryFn: getAllDevices,
  });
}

async function deleteDevice(id) {
  const data = await axios
    .delete("/device/", { params: { id } })
    .then(({ data }) => data);
  return data;
}
export function useDeleteDevice() {
  const queryClient = useQueryClient();
  return useMutation(["devices"], deleteDevice, {
    staleTime: 60000,
    onSuccess: () => {
      successToast("Success");
      queryClient.invalidateQueries(["devices"]);
    },
    onError: (error, variables, context) => {
      errorToast(error.response?.data);
    },
  });
}

async function getProtocols() {
  const data = await axios.get("/plugin/").then(({ data }) => data);
  return data;
}
export function useProtocols() {
  return useQuery(["plugin"], getProtocols, {
    staleTime: 2 * 3600 * 1000,
    retry: false,
    placeholderData: { southBound: [], northBound: [] },
  });
}
async function createDevice(data) {
  const device = await axios
    .post("/device/", { ...data })
    .then(({ data }) => data);
  return device;
}
export function useCreateDevice({ onSuccess = () => {} }) {
  const queryClient = useQueryClient();
  return useMutation(["devices"], createDevice, {
    onSuccess: () => {
      onSuccess();
      successToast("Success");
      queryClient.invalidateQueries(["devices"]);
    },
    onError: (error, variables, context) => {
      errorToast(error.response?.data);
    },
  });
}

async function getDevice({ id, name }) {
  const { data } = await axios.get("/device", { params: { id, name } });
  return data;
}
export function useDevice({ id, name }) {
  return useQuery(["devices", { id, name }], getDevice, {
    staleTime: 60000 * 2,
  });
}

async function getDeviceStatus() {
  const { data } = await axios.get("/devices/status");
  return data;
}
export function useDeviceState() {
  return useQuery(["devices", "status"], getDeviceStatus, {
    staleTime: 60000 * 2,
    placeholderData: { active: 0, dormant: 0, total: 0 },
  });
}
