import logger from "logger";
import { AuthConfig, AuthModelInit } from "./models";
export * from "./passport";
export { default as routes } from "./routes";

export async function AuthInit() {
  await AuthModelInit();
  logger.info("Inited Auth module");
}
export { AuthConfig };
