import type { Request, Response } from "express";
import southBound from "./southBound";
import northBound from "./northBound";
class PluginController {
  public static async list(req: Request, res: Response) {
    res.send({
      southBound: await southBound.list(),
      northBound: await northBound.list(),
    });
  }
}
export { PluginController };
