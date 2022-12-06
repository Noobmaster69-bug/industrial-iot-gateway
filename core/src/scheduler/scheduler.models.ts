import { DataTypes, Model } from "sequelize";
import { sequelize } from "ultils";
import cron from "node-cron";
class Schedulers extends Model {
  declare id: number;
  declare cron: string;
  declare state: "start" | "stop";
}

Schedulers.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: true,
    },
    cron: {
      type: DataTypes.STRING,
      validate: {
        isCron(value: string) {
          if (!cron.validate(value)) {
            throw new Error("Invalid cron");
          }
        },
      },
    },
    state: {
      type: DataTypes.ENUM,
      values: ["start", "stop"],
    },
  },
  { sequelize }
);
export { Schedulers };
