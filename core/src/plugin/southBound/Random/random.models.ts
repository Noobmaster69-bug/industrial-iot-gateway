import { DataTypes, Model } from "sequelize";
import { sequelize } from "ultils";
class RandomChannels extends Model {
  declare max: number;
  declare min: number;
}

RandomChannels.init(
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

class RandomProtocols extends Model {
  declare seed: number;
}
RandomProtocols.init(
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

export { RandomChannels, RandomProtocols };
