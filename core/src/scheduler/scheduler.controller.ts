import type { Request, Response } from "express";
import { Schedules } from "./scheduler.models";
import { Devices, Channels } from "devices";
import { sequelize } from "ultils";
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
    const result = await sequelize.transaction(async (transaction) => {
      const result = await Schedules.create(
        {
          cron,
          state,
          DeviceId: device_id,
        },
        {
          transaction,
          include: {
            model: Devices,
          },
        }
      );
      for (const channel_id of channels) {
        const channel = await Channels.findByPk(channel_id);
        if (channel) {
          //@ts-ignore
          await channel.addSchedule(result, { transaction });
        }
      }
      return result;
    });
    res.send(result);
  }
}
export { SchedulerController };
