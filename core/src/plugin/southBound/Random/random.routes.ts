import { Router } from "express";
import { RandomPluginController } from "./random.controller";
const routes = Router();
//trace log
routes.get("/random", RandomPluginController.info);
export default routes;
