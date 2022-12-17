import { Router } from "express";
import { SchedulerController } from "./scheduler.controller";
const routes = Router();
routes.post("/schedule", SchedulerController.newSchedule);
routes.get("/schedule", SchedulerController.getSchedule);
routes.delete("/schedule", SchedulerController.deleteSchedule);

routes.get("/schedules", SchedulerController.getSchedules);
export default routes;
