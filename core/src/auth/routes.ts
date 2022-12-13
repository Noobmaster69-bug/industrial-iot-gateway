import { Router } from "express";
import { AuthController } from "auth/controller";
import { authenticate } from "./passport";
const routes = Router();

routes.get("/auth", authenticate, AuthController.getAuth);
routes.post("/auth", AuthController.login);
routes.post("/auth/mqtt", AuthController.mqttAuth);

export default routes;
