/**
 * TODO: refactor type
 */
import { Model, DataTypes, Op } from "sequelize";
import { sequelize } from "utils/sequelize";
import Transport from "winston-transport";
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
  levels: Array<"info" | "warn" | "error">;
  from: Date | string;
  until: Date | string;
  start: number;
  limit: number;
}
interface queryResult {
  rows: Array<logs>;
  total: number;
}
class Logs extends Model {
  declare id: number;
  declare level: string;
  declare message: string;
  declare label: string;
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
    label: {
      type: DataTypes.STRING,
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
  public override log(info: { [x: string]: string }, next: () => void): any {
    const { level, timestamp, message, label } = info;
    Logs.create({
      level,
      timestamp,
      message,
      label,
    })
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
    const { from, until, start, limit } = options;
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
