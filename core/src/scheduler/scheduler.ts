import cron from "node-cron";

class Scheduler {
  public static list: Array<Scheduler> = [];
  public static start(id: number) {
    const cronTask = this.list.find((scheduler) => {
      scheduler.id === id;
    });
    cronTask?.start();
    return cronTask;
  }

  public static stop(id: number) {
    const cronTask = this.list.find((scheduler) => {
      scheduler.id === id;
    });
    cronTask?.stop();
    return cronTask;
  }

  public static delete(id: number) {
    this.stop(id);
    const index = this.list.findIndex((scheduler) => {
      scheduler.id === id;
    });
    this.list = this.list.slice(index, 1);
  }
  public id: number;
  public callback: (scheduler: Scheduler) => any;
  public cronString: string;
  public cronTask: cron.ScheduledTask;
  public options: { startNow?: true } | undefined;
  constructor(
    id: number,
    cronString: string,
    callback: (scheduler: Scheduler) => any,
    options?: { startNow?: true }
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
