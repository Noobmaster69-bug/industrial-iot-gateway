import { Router } from "express";
import { SchedulerController } from "./scheduler.controller";
const routes = Router();
routes.post("/schedulers", SchedulerController.newSchedule);
export default routes;
