/**
 * TODO: refactor type
 */
import { Model, DataTypes, Op } from "sequelize";
import { sequelize } from "ultils";
import Transport from "winston-transport";
import { MESSAGE } from "triple-beam";
import type { QueryOptions } from "winston";
interface logs {
  id: number;
  level: string;
  message: string;
  timestamp: string | Date;
}

interface queryOptions
  extends Omit<
    QueryOptions,
    keyof { fields: string; from?: Date; until?: Date }
  > {
  levels?: Array<"info" | "warn" | "error">;
  from?: Date | string;
  until?: Date | string;
}
interface queryResult {
  rows: Array<logs>;
  total: number;
}
class Logs extends Model {
  declare id: number;
  declare level: string;
  declare message: string;
  declare timestamp: string | Date;
}
Logs.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    level: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { sequelize, timestamps: false }
);
class SqliteTransport extends Transport {
  name: string;
  constructor(options: Transport.TransportStreamOptions) {
    super(options);
    this.name = "sqlite3";
  }
  override log(info: any, next: () => void): any {
    const messageAsJson = JSON.parse(info[MESSAGE]);
    Logs.create(messageAsJson)
      .then(() => {
        next();
      })
      .catch((err) => {
        next();
        console.log(err);
      });
  }
  query(
    options: queryOptions,
    callback: (
      err: Error | null,
      result: { rows: Array<logs>; total: number }
    ) => void
  ) {
    const levels = options.levels || ["debug", "info", "warn", "error"];
    const from = options.from ? new Date(options.from) : new Date(0);
    const until = options.until ? new Date(options.until) : new Date();
    const start = options.start || 0;
    const limit = options.limit || Number.MAX_SAFE_INTEGER;
    const order = options.order?.toUpperCase() || "DESC";
    Logs.findAndCountAll({
      where: {
        level: {
          [Op.or]: levels,
        },
        timestamp: {
          [Op.lte]: until,
          [Op.gte]: from,
        },
      },
      limit,
      offset: start,
      order: [["timestamp", order]],
    }).then((result) => {
      return callback(null, {
        rows: result.rows.map((e) => e.toJSON()),
        total: result.count,
      });
    });
  }
}
export async function init() {
  await Logs.sync();
}
export { queryOptions, queryResult };
export default SqliteTransport;
