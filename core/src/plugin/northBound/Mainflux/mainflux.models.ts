import { Model, DataTypes } from "sequelize";
import { sequelize } from "ultils";
class MainfluxProtocol extends Model {
  declare thingId: string;
  declare thingKey: string;
  declare channelId: string;
  declare host: string;
  declare port: number;
}

MainfluxProtocol.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    thingId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    thingKey: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    channelId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    host: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    port: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1883,
    },
  },
  { sequelize }
);
export { MainfluxProtocol };
