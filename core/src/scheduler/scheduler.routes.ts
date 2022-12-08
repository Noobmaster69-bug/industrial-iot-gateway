import { Router } from "express";
import { SchedulerController } from "./scheduler.controller";
const routes = Router();
routes.post("/schedule", SchedulerController.newSchedule);
routes.get("/schedule", SchedulerController.getSchedule);

routes.get("/schedules", SchedulerController.getSchedules);
export default routes;
