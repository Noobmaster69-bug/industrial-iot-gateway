import { Router } from "express";
import { routes as southBoundRoutes } from "./southBound";
import { PluginController } from "./plugin.controller";
const routes = Router();
routes.use("/plugin", southBoundRoutes);
routes.get("/plugin", PluginController.list);
export default routes;
