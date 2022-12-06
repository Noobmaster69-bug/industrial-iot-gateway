import { Schedules } from "./scheduler.models";
import Scheduler from "./scheduler";
export { default as routes } from "./scheduler.routes";
export async function schedulerInit() {
  const schedules = await Schedules.getAllTask();
  schedules.map((schedule) => {
    console.log(schedule);
    Scheduler.newReadDataTask(schedule.id, schedule.cron, {
      startNow: schedule.state === "running",
    });
  });
}
