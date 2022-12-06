import { routes as randomRoutes } from "./Random";

import { Router } from "express";
const routes = Router();

routes.use("/southbound", randomRoutes);
export default routes;
