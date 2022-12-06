import { DataTypes, Model } from "sequelize";
import { sequelize } from "ultils";
class RandomChannel extends Model {
  declare max: number;
  declare min: number;
}

RandomChannel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    max: {
      type: DataTypes.REAL,
      defaultValue: Number.MAX_SAFE_INTEGER,
    },
    min: {
      type: DataTypes.REAL,
      defaultValue: Number.MIN_SAFE_INTEGER,
    },
  },
  { sequelize }
);

class RandomProtocol extends Model {
  declare seed: number;
}
RandomProtocol.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    seed: {
      type: DataTypes.REAL,
      defaultValue: 1,
      set(this, value: unknown) {
        if (value === 0) {
          this.setDataValue("seed", 1);
        } else {
          this.setDataValue("seed", value);
        }
      },
    },
  },
  { sequelize }
);

export { RandomChannel, RandomProtocol };
