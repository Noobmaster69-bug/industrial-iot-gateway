import { Router } from "express";
import LoggerController from "logger/controller";
import LoggerValidator from "./validator";
const LoggerRouter = Router();
LoggerRouter.get("/logger", LoggerValidator.QueryLog, LoggerController.trace);
export default LoggerRouter;
