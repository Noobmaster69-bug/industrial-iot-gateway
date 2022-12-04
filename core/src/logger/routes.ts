import { Router } from "express";
import { LoggerController } from "logger/controller";
const routes = Router();
//trace log
routes.get("/logger", LoggerController.trace);
export default routes;
