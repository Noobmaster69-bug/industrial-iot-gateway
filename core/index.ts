import express, { json, urlencoded } from "express";
import { queryParser } from "express-query-parser";
import cors from "cors";
import morgan from "morgan";

import createLogger, { LoggerInit, LoggerRouter } from "logger";
import { SocketInit } from "socket";

const logger = createLogger("app");
const morganLogger = createLogger("morgan");
async function main() {
  const app = express();

  app.use(cors());
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use(
    morgan(":method :url :status :res[content-length] - :response-time ms", {
      stream: {
        write: (text: string) => {
          morganLogger.info(text.replace(/\n$/, ""));
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
  // app.use(passport.initialize());

  //init modules
  const server = await SocketInit(app);
  await LoggerInit();

  //init routes
  app.use(LoggerRouter);

  return server;
}

main()
  .then((server) => {
    server.listen(33333, "0.0.0.0", () => {
      logger.info("Listening on port 33333");
    });
  })
  .catch((error: any) => {
    logger.error(error);
  });
