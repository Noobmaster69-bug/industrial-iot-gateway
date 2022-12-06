import type { Request, Response } from "express";
import RandomPlugin from "./random";
class RandomPluginController {
  public static async info(_req: Request, res: Response) {
    const results = await RandomPlugin.getProperties();
    res.send(results);
  }
}

export { RandomPluginController };
