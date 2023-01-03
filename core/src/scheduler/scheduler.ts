import logger from "logger";
import cron from "node-cron";
import { Schedules } from "./scheduler.models";
class Scheduler {
  public static list: Array<Scheduler> = [];
  public static start(id: number) {
    const cronTask = this.list.find((scheduler) => {
      return scheduler.id === id;
    });
    cronTask?.start();
    return cronTask;
  }

  public static stop(id: number) {
    const cronTask = this.list.find((scheduler) => {
      return scheduler.id === id;
    });
    cronTask?.stop();
    return cronTask;
  }

  public static delete(id: number) {
    this.stop(id);
    const index = this.list.findIndex((scheduler) => {
      return scheduler.id === id;
    });
    this.list = this.list.filter((_it, _index) => _index !== index);
  }
  public static newReadDataTask(
    id: number,
    cronString: string,
    options?: { startNow?: boolean }
  ) {
    return new Scheduler(
      id,
      cronString,
      async (_schedule) => {
        try {
          let task = await Schedules.getTask(id);
          let data = await task.downPlugin?.plugin.get(
            task.downProtocol,
            task.channels
          );
          const pkg = data?.map(
            (sample: {
              value: any;
              offset: any;
              scale: number;
              precision: number | undefined;
              name: any;
            }) => {
              //@ts-ignore
              let v = (sample.value + sample.offset) * sample.scale;
              //@ts-ignore

              if (sample.precision) {
                //@ts-ignore

                v = v.toFixed(sample.precision);
              }
              return {
                //@ts-ignore
                n: sample.name,
                v: Number(v),
              };
            }
          );
          //@ts-ignore
          pkg[0].bn = `urn:dev:id:${task.Device.deviceKey}:`;

          //@ts-ignore
          pkg[0].bt = Number((Date.now() / 1000).toFixed(3));
          //@ts-ignore
          await task.upPlugin?.plugin.up(task.upProtocol, pkg);
        } catch (err) {
          logger.warn(err);
        }
      },
      options
    );
  }

  public id: number;
  public callback: (scheduler: Scheduler) => any;
  public cronString: string;
  public cronTask: cron.ScheduledTask;
  public options: { startNow?: boolean } | undefined;
  constructor(
    id: number,
    cronString: string,
    callback: (scheduler: Scheduler) => any,
    options?: { startNow?: boolean }
  ) {
    if (cron.validate(cronString)) {
      this.id = id;
      this.callback = callback;
      this.cronString = cronString;
      const that = this;
      this.cronTask = cron.schedule(cronString, () => {
        callback(that);
      });
      if (options) {
        this.options = options;
        if (this.options.startNow) {
          this.cronTask.start();
        }
      }
      Scheduler.list.push(this);
    } else {
      throw new Error("invalid cron string");
    }
  }
  start() {
    this.cronTask.start();
  }
  stop() {
    this.cronTask.stop();
  }
}
export default Scheduler;
