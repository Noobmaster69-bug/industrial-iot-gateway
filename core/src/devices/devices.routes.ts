import { Router } from "express";
import { DeviceController } from "./devices.controller";
const routes = Router();
//trace log
routes.post("/devices", DeviceController.newDevice);
export default routes;
