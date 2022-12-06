import healthcheck from "./healthCheck";
import type { Request, Response } from "express";
class HealthCheckController {
  public static async getSystemInfo(_req: Request, res: Response) {
    const result = await healthcheck.getSystemInfo();
    res.send(result);
  }
}
export { HealthCheckController };
