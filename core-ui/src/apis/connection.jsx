import { useQuery } from "@tanstack/react-query";
import { axios } from "utils";

async function getConnections({ queryKey }) {
  const [_key, types] = queryKey;
  const { data } = await axios.get("/connections", {
    params: { types },
  });
  return data;
}
export function useConnections({ types }) {
  return useQuery({
    queryKey: ["protocols", types],
    queryFn: getConnections,
  });
}
