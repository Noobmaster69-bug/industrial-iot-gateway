import winston from "winston";
import SqliteTransport, {
  init as SqliteInit,
  queryOptions,
  queryResult,
} from "./SqliteTransport";
import MqttTransport from "./MqttTransport";

const winstonLogger = winston.createLogger({
  transports: [
    //log to console
    new winston.transports.Console({
      level: "debug",
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
        winston.format.printf((info) => {
          return `${info.level}: ${[info["timestamp"]]}: ${info.message}`;
        })
      ),
    }),
    //log to sqlite
    new SqliteTransport({
      level: "info",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
    //log to mqtt with topic $CORE/LOGS
    new MqttTransport({
      level: "info",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
  ],
});

export { winstonLogger };

export async function WinstonInit() {
  await SqliteInit();
}
export async function query(options?: queryOptions): Promise<queryResult> {
  const from = options?.from ? new Date(options.from) : new Date(0);
  const until = options?.until ? new Date(options.until) : new Date();
  const start = options?.start || 0;
  const limit = options?.limit || Number.MAX_SAFE_INTEGER;
  const order = options?.order || "desc";
  return new Promise((resolve, reject) => {
    winstonLogger.query(
      {
        ...options,
        fields: ["level", "message", "timestamp"],
        from,
        until,
        limit,
        start,
        order,
      },
      (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result.sqlite3);
      }
    );
  });
}
