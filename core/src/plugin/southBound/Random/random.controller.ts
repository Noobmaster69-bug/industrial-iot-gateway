import type { Request, Response } from "express";
import { RandomChannels, RandomProtocols } from "./random.models";
class RandomPluginController {
  public static async info(_req: Request, res: Response) {
    res.send({
      channels: RandomChannels.getAttributes(),
      protocols: RandomProtocols.getAttributes(),
    });
  }
}

export { RandomPluginController };
