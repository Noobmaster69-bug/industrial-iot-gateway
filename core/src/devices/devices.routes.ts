import { Router } from "express";
import { DeviceController } from "./devices.controller";
const routes = Router();
//trace log
routes.post("/device", DeviceController.newDevice);
routes.delete("/device", DeviceController.deleteDevices);
routes.get("/device", DeviceController.getDevice);

routes.get("/devices", DeviceController.getAllDevices);
routes.get("/devices/status", DeviceController.getDeviceStatus);
export default routes;
