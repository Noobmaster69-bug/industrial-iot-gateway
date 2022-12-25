import express from "express";
import createLogger, { LoggerInit } from "logger";
import { SocketInit } from "socket";

const logger = createLogger("app");
const app = express();

async function main() {
  await LoggerInit();
  await SocketInit(app, 33333);
}

main()
  .then(() => {
    logger.info("Listening on port 33333");
  })
  .catch((error: any) => {
    logger.error(error);
  });
