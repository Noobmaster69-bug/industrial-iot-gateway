import type { Request, Response } from "express";
import type { queryOptions } from "./SqliteTransport";
import { query, winstonLogger } from "./winston";

class LoggerController {
  public static async trace(req: Request, res: Response) {
    const params = req.query as unknown as queryOptions;
    try {
      const result = await query(params);
      res.send(result);
    } catch (err: any) {
      winstonLogger.info({
        message: err.message,
        level: "error",
        label: "logger",
      });
      res.status(400).send(err);
    }
  }
}
export default LoggerController;
