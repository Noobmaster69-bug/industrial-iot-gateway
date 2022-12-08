import sqlite3 from "sqlite3";
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db.sqlite",
  logging: true,
  dialectModule: sqlite3,
});

export default sequelize;
