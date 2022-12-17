import { routes as randomRoutes } from "./Random";

import { Router } from "express";
import SoundBoundController from "./southBound.controller";
const routes = Router();

routes.use("/southbound", randomRoutes);

routes.get("/southBound", SoundBoundController.list);
export default routes;
