import winston from "winston";
import SocketTransport from "./SocketTransport";
import chalk from "chalk";
import stringHash from "string-hash";
import type { queryOptions, queryResult } from "./SqliteTransport";
import SqliteTransport from "./SqliteTransport";

const printer = winston.format.printf((info) => {
  const colors = [
    "black",
    "red",
    "green",
    "yellow",
    "blue",
    "magenta",
    "cyan",
    "white",
    "blackBright",
    "redBright",
    "greenBright",
    "yellowBright",
    "blueBright",
    "magentaBright",
    "cyanBright",
    "whiteBright",
  ];
  const label = info["label"];
  const color = colors[stringHash(label) % 16] as string;
  //@ts-ignore
  const colorize: (message: any) => string = chalk[color];
  return colorize(
    `[${[info["timestamp"]]}] [${info.level}] [${info["label"]}]: ${
      info.message
    }`
  );
});

const winstonLogger = winston.createLogger({
  transports: [
    //log to console
    new winston.transports.Console({
      level: "debug",
      format: winston.format.combine(
        winston.format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
        printer
      ),
    }),
    new SocketTransport({
      level: "debug",
      format: winston.format.combine(winston.format.timestamp(), printer),
    }),
    new SqliteTransport({
      level: "debug",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
  ],
});

export { winstonLogger };
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
