import { useQuery } from "@tanstack/react-query";
import { axios } from "utilities";
export function useProtocol() {
  return useQuery(
    ["services"],
    async () => {
      const data = await axios.get("/services/all").then(({ data }) => data);
      if (data) {
        return data;
      }
      return undefined;
    },
    {
      staleTime: 2 * 3600 * 1000,
      retry: false,
    }
  );
}
export function useGetProtocol(id) {
  return useQuery(
    ["services", id],
    async () => {
      const data = await axios
        .get("/services/", { params: { id } })
        .then(({ data }) => data);
      if (data) {
        return data;
      }
      return undefined;
    },
    {
      staleTime: 2 * 3600 * 1000,
      retry: false,
    }
  );
}
