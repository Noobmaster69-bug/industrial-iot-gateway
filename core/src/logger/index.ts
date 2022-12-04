import { winstonLogger, WinstonInit } from "./winston";
//export routes
export { default as routes } from "./routes";

//export module init function
export async function LoggerInit() {
  await WinstonInit();
}

//export log query function

export default {
  info: (message: any) => {
    winstonLogger.info(message);
  },
  error: (message: any) => {
    winstonLogger.error(message);
  },
  warn: (message: any) => {
    winstonLogger.warn(message);
  },
  debug: (message: any) => {
    winstonLogger.debug(message);
  },
};
