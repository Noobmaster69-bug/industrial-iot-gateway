import { Model, DataTypes } from "sequelize";
import { sequelize } from "ultils";
class Channels extends Model {
  declare name: string;
  declare readWrite: string;
  declare offset: number;
  declare scale: number;
  declare precision: number;
}
Channels.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    readWrite: {
      type: DataTypes.ENUM,
      values: ["R", "W", "RW"],
      defaultValue: "R",
    },
    offset: {
      type: DataTypes.REAL,
      defaultValue: 0,
    },
    scale: {
      type: DataTypes.REAL,
      defaultValue: 1,
    },
    precision: {
      type: DataTypes.REAL,
    },
    plugin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize }
);

class Devices extends Model {
  declare id: number;
  declare name: string;
  declare modelName: string;
  declare manufacturer: string;
  declare type: string;
  declare downProtocol: {
    id: number;
    name: string;
    plugin: string;
  };
}

Devices.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    modelName: {
      type: DataTypes.STRING,
    },
    manufacturer: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM,
      values: ["active", "dormant"],
      defaultValue: "dormant",
    },
    deviceKey: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize }
);

class Protocols extends Model {
  declare name: string;
  declare plugin: string;
  declare type: string;
}

Protocols.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      get() {
        return (
          this.getDataValue("name") || `connection ${this.getDataValue("id")}`
        );
      },
    },
    plugin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM,
      values: ["upProtocol", "downProtocol"],
    },
  },
  { sequelize }
);

export { Devices, Channels, Protocols };
