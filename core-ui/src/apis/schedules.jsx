import { useQuery } from "@tanstack/react-query";
import { axios } from "utils";
async function getAllSchedules({ queryKey }) {
  // eslint-disable-next-line no-unused-vars
  const [_key, { start, limit }] = queryKey;
  const { data } = await axios.get("/schedules", { params: { start, limit } });
  return data;
}
export function useAllSchedules({ start, limit }) {
  return useQuery({
    queryKey: ["schedules", { start, limit }],
    queryFn: getAllSchedules,
    placeholderData: { start, limit, total: 0, schedules: [] },
  });
}

async function getSchedule({ queryKey }) {
  // eslint-disable-next-line no-unused-vars
  const [_key, id] = queryKey;
  const { data } = await axios.get("/schedule", { params: { id } });
  return data;
}
export function useSchedule(id) {
  return useQuery({
    queryKey: ["schedule", id],
    queryFn: getSchedule,
    placeholderData: {
      id: -1,
      cron: "",
      state: "",
      createdAt: "",
      updatedAt: "",
      Device: {},
      channels: [],
      downPlugin: {},
      upPlugin: {},
    },
  });
}
