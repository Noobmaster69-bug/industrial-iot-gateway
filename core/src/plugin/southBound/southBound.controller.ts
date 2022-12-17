import type { Request, Response } from "express";
import SouthBound from "./southBound";
class SoundBoundController {
  public static async list(_req: Request, res: Response) {
    res.send(await SouthBound.list());
  }
}
export default SoundBoundController;
