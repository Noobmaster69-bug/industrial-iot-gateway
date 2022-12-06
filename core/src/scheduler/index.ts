import { Schedulers } from "./scheduler.models";
import Scheduler from "./scheduler";
import { Devices, Channels } from "devices";
export { default as routes } from "./scheduler.routes";
export async function schedulerInit() {
  Devices.hasMany(Schedulers);
  Schedulers.belongsTo(Devices);

  Schedulers.hasMany(Channels);
  Channels.belongsTo(Schedulers);

  await Schedulers.sync();
  await Devices.sync();
  await Channels.sync();
  const schedules = await Schedulers.findAll({
    include: { all: true },
  });
  schedules.map((schedule) => {
    console.log(schedule);
    new Scheduler(
      schedule.id,
      schedule.cron,
      (_schedule: Scheduler) => {
        console.log("hehe");
      },
      {
        startNow: true,
      }
    );
  });
}
