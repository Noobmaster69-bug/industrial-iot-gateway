import { routes as randomRoutes } from "./Random";
import { routes as modbusRoutes } from "./Modbus";
import { Router } from "express";
import SoundBoundController from "./southBound.controller";
const routes = Router();

routes.use("/southBound", randomRoutes);
routes.use("/southBound", modbusRoutes);
routes.get("/southBound", SoundBoundController.list);
export default routes;
