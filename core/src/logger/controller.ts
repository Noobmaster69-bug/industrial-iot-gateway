import type { Request, Response } from "express";
import type { queryOptions } from "logger/SqliteTransport";
import { query } from "./winston";
const LoggerController = {
  trace: async (req: Request, res: Response) => {
    const params = req.params as unknown as queryOptions;
    const result = await query(params);
    res.send(result);
  },
};
export { LoggerController };
