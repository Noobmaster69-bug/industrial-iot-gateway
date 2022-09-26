import Axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import Toast from "./toast";
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
        .get("/devices/model")
        .then(({ data }) => data)
        .catch((err) => console.log(JSON.stringify(err)));
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
      onSuccess: () => {
        nevigate("overview");
      },
      onError: () => {
        if (location.pathname !== "/login") {
          window.location.href = "login";
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
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      return data;
    },
    {
      // mutationKey: "user",
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
  const queryClient = useQueryClient();
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
        queryClient.invalidateQueries(["user"]);
      },
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
