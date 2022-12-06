import type { Request, Response } from "express";
import { Schedulers } from "./scheduler.models";
import { Devices, Channels } from "devices";
import { sequelize } from "ultils";
import { result } from "lodash";
interface SchedulerDTO {
  cron: string;
  state: string;
  device_id: number;
  channels: Array<number>;
}

class SchedulerController {
  public static async newSchedule(req: Request, res: Response) {
    const { cron, device_id, channels, state } =
      req.body as unknown as SchedulerDTO;
    await sequelize.transaction(async (transaction) => {
      const result = await Schedulers.create(
        {
          cron,
          state,
          Devices: {
            id: device_id,
          },
          Channels: channels.map((channel) => ({ id: channel })),
        },
        {
          transaction,
          include: {
            model: Devices,
          },
        }
      );
      console.log(result);
    });
  }
}
export { SchedulerController };
