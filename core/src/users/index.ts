import logger from "logger";
import { Users, init as UserModelInit } from "./models";

//export

export async function UserInit() {
  await UserModelInit();
  logger.info("Inited Users module");
}

export { Users };

export { default as routes } from "./routes";
