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
  },
  { sequelize }
);

class Devices extends Model {
  declare name: string;
  declare modelName: string;
  declare manufacturer: string;
  declare type: string;
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
  },
  { sequelize }
);

class Protocols extends Model {
  declare name: string;
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
  },
  { sequelize }
);

export async function init() {
  Devices.hasMany(Channels, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  Channels.belongsTo(Devices, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  //device associate
  Devices.hasOne(Protocols, {
    as: "upProtocol",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  Protocols.belongsTo(Devices, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  Devices.hasOne(Protocols, {
    as: "downProtocol",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  Protocols.belongsTo(Devices, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  await Devices.sync();
  await Channels.sync();
  await Protocols.sync();
}
export { Devices, Channels, Protocols };
