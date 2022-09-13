import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Toast from "./toast";
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
      const data = await axios.get("/devices/model").then(({ data }) => data);
      return data;
    },
    {
      staleTime: 60000,
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
        successToast("Complete");
        queryClient.invalidateQueries("devices");
      },
      onError: (error, variables, context) => {
        errorToast(error.response?.data);
      },
    }
  );
}
export function useModels() {
  return useQuery(
    "models",
    async () => {
      const data = await axios.get("/models/").then(({ data }) => data);
      return data;
    },
    {
      staleTime: 60000,
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
// export function useProvision({ onSuccess = () => {} }) {
//   const queryClient = useQueryClient();
//   const errorToast = Toast("error");
//   return useMutation(
//     (data) =>
//       axios.get("/devices/provision", {
//         params: {
//           id: data,
//         },
//       }),
//     {
//       onSuccess: () => {
//         onSuccess();
//         queryClient.invalidateQueries("devices-info");
//       },
//       onError: (error, variables, context) => {
//         errorToast(error.response?.data);
//       },
//     }
//   );
// }
// export function useProtcolConfig(name) {
//   return useQuery(
//     `protocol?${name}`,
//     async () => {
//       if (name) {
//         const data = await axios
//           .get("/protocol", {
//             params: {
//               id: name,
//             },
//           })
//           .then(({ data }) => data);
//         return data;
//       }
//       return 0;
//     },
//     {
//       staleTime: 100,
//     }
//   );
// }
// export function useTask() {
//   return useQuery(
//     "task",
//     async () => {
//       const data = await axios.get("/tasks").then(({ data }) => data);
//       return data;
//     },
//     {
//       staleTime: 60000,
//     }
//   );
// }
// export function useMutateProtocol({ onSuccess = () => {} }) {
//   const queryClient = useQueryClient();
//   const errorToast = Toast("error");
//   return useMutation((data) => axios.post("/protocol", data), {
//     onSuccess: () => {
//       onSuccess();
//       queryClient.invalidateQueries("service-info");
//     },
//     onError: (error, variables, context) => {
//       errorToast(error.response?.data);
//     },
//   });
// }
// export function useDeleteDevice({ onSuccess = () => {} }) {
//   const queryClient = useQueryClient();
//   const errorToast = Toast("error");

//   return useMutation((data) => axios.delete("/devices", { params: data }), {
//     onSuccess: () => {
//       onSuccess();
//       queryClient.invalidateQueries("devices-info");
//     },
//     onError: (error, variables, context) => {
//       errorToast(error.response?.data);
//     },
//   });
// }
// export function useMutateDevice({ onSuccess = () => {} }) {
//   const queryClient = useQueryClient();
//   const errorToast = Toast("error");
//   return useMutation((data) => axios.post("/devices", data), {
//     onSuccess: () => {
//       onSuccess();
//       queryClient.invalidateQueries("devices-info");
//     },
//     onError: (error, variables, context) => {
//       errorToast(error.response?.data);
//     },
//   });
// }
// export function useMutateTask({ onSuccess = () => {} }) {
//   const queryClient = useQueryClient();
//   const errorToast = Toast("error");
//   return useMutation((data) => axios.post("/tasks", data), {
//     onSuccess: () => {
//       onSuccess();
//       queryClient.invalidateQueries("task");
//     },
//     onError: (error, variables, context) => {
//       errorToast(error.response?.data);
//     },
//   });
// }
