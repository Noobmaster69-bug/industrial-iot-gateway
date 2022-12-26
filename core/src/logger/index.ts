import { winstonLogger } from "./winston";
import { init } from "./SqliteTransport";

const logger = createLogger("logger");
export async function LoggerInit() {
  await init();
  logger.info("Inited Logger module");
}

export default function createLogger(label: string) {
  return {
    error: (message: string) => {
      winstonLogger.log({ level: "info", message, label });
    },
    warn: (message: string) => {
      winstonLogger.log({ level: "warn", message, label });
    },
    info: (message: string) => {
      winstonLogger.log({ level: "info", message, label });
    },
    debug: (message: string) => {
      winstonLogger.log({ level: "debug", message, label });
    },
  };
}
export { default as LoggerRouter } from "./routes";
