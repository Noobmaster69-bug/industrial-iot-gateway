import { Router } from "express";
import { HealthCheckController } from "./healthCheck.controller";
const routes = Router();
//trace log
routes.get("/healthcheck", HealthCheckController.getSystemInfo);
export default routes;
