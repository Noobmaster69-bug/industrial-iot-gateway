import createLogger from "logger";
import { Users, init as UserModelInit } from "./models";
const logger = createLogger("users");

export async function UserInit() {
  await UserModelInit();
  logger.info("Inited Users module");
}

export { Users };

export { default as UsersRouter } from "./router";
