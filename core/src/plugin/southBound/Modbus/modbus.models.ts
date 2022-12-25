import { DataTypes, Model } from "sequelize";
import { sequelize } from "ultils";

//Channel
class ModbusChannels extends Model {
  declare dataType: string;
  declare addr: number;
  declare fc: string;
}

ModbusChannels.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    dataType: {
      type: DataTypes.ENUM,
      values: [
        "BigInt64BE",
        "BigInt64LE",
        "BigUInt64BE",
        "BigUInt64BE",
        "BigUInt64LE",
        "DoubleBE",
        "DoubleLE",
        "FloatBE",
        "FloatLE",
        "Int32BE",
        "Int32LE",
        "UInt32BE",
        "UInt32LE",
        "Int16BE",
        "Int16LE",
        "UInt16BE",
        "UInt16LE",
      ],
      defaultValue: "Int16BE",
    },
    addr: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fc: {
      type: DataTypes.ENUM,
      values: ["03"],
      defaultValue: "03",
    },
  },
  { sequelize }
);

//Protocol

class ModbusProtocols extends Model {
  declare path: string;
  declare baudRate: number;
  declare slaveID: number;
  declare parity: string;
}
ModbusProtocols.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    baudRate: {
      key: "baudRate",
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    slaveID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    parity: {
      type: DataTypes.ENUM,
      values: ["none", "odd", "even"],
      allowNull: false,
    },
  },
  { sequelize }
);

export { ModbusChannels, ModbusProtocols };
