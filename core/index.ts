//third party module
import cors from "cors";
import express, { json, urlencoded } from "express";
import morgan from "morgan";
import { queryParser } from "express-query-parser";
import { passport } from "auth";
//
import logger, { LoggerInit, routes as LoggerRoutes } from "logger";
import { routes as UserRoutes, UserInit } from "users";
import { routes as AuthRoutes, AuthInit } from "auth";
import { routes as healthCheckRoutes } from "healthcheck";

import { routes as pluginRoutes } from "plugin";
import { routes as devicesRoutes, DevicesInit } from "devices";
import { routes as schedulerRoutes, schedulerInit } from "scheduler";

async function main() {
  //init express
  const app = express();
  app.use(cors());
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use(
    morgan(":method :url :status :res[content-length] - :response-time ms", {
      stream: {
        write: (text: string) => {
          logger.info("api:" + text.replace(/\n$/, ""));
        },
      },
    })
  );
  app.use(
    queryParser({
      parseBoolean: true,
      parseNull: true,
      parseNumber: true,
      parseUndefined: true,
    })
  );
  app.use(passport.initialize());
  //init modules
  await LoggerInit();
  await UserInit();
  await AuthInit();
  await DevicesInit();
  await schedulerInit();
  //init routes
  app.use("/api", LoggerRoutes);
  app.use("/api", healthCheckRoutes);
  app.use("/api", UserRoutes);
  app.use("/api", AuthRoutes);
  app.use("/api", pluginRoutes);
  app.use("/api", devicesRoutes);
  app.use("/api", schedulerRoutes);

  //run server
  app.listen(33333, () => {
    logger.info("core: listening to port 33333");
  });
}

main();
