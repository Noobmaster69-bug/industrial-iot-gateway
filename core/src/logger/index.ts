import winston from "winston";
import SqliteTransport, {
  init as SqliteInit,
  queryOptions,
  queryResult,
} from "./SqliteTransport";

const winstonLogger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new SqliteTransport({
      level: "info",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
  ],
});

export default {
  init: async () => {
    await SqliteInit();
  },
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
  query: async (options?: queryOptions): Promise<queryResult> => {
    const from = new Date(options?.from || 0);
    const until = new Date(options?.until || 0);
    return new Promise((resolve, reject) => {
      winstonLogger.query(
        { ...options, fields: ["level", "message", "timestamp"], from, until },
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result.sqlite3);
        }
      );
    });
  },
};
