import { Router } from "express";
import { ModbusController } from "./modbus.controller";
const routes = Router();
routes.get("/modbus", ModbusController.info);
export default routes;
