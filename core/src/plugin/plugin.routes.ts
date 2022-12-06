import { Router } from "express";
import { routes as southBoundRoutes } from "./southBound";
const routes = Router();
routes.use("/plugin", southBoundRoutes);
export default routes;
