import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { axios } from "utilities";
export function useProtocol() {
  return useQuery(
    ["servces"],
    async () => {
      const data = await axios.get("/services/").then(({ data }) => data);
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
