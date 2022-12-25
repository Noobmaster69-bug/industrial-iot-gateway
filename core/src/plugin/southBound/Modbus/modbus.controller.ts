import type { Request, Response } from "express";
import ModbusPlugin from "./modbus";
class ModbusController {
  public static async info(_req: Request, res: Response) {
    const results = await ModbusPlugin.getProperties();
    res.send(results);
  }
}

export { ModbusController };
