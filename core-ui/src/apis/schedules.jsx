import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { axios, successToast } from "utils";
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
    queryKey: ["schedules", id],
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

async function createSchedule(schedule) {
  const { data } = await axios.post("/schedule", schedule);
  return data;
}
export function useCreateSchedule() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: createSchedule,
    mutationKey: "schedules",
    onSuccess: () => {
      navigate(-1);
    },
  });
}

async function deleteSchedule(id) {
  const { data } = await axios.delete("/schedule", { params: { id } });
  return data;
}

export function useDeleteSchedule() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSchedule,
    mutationKey: "schedules",
    onSuccess: () => {
      successToast("Success");
      queryClient.invalidateQueries(["schedules"]);
    },
  });
}
