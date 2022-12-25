import { ModbusChannels, ModbusProtocols } from "./modbus.models";
import type { Model, ModelStatic } from "sequelize";
import ModbusPlugin from "./modbus";

export { default as routes } from "./modbus.routes";

export async function modbusInit({
  Channels,
  Protocols,
}: {
  Channels: ModelStatic<Model>;
  Protocols: ModelStatic<Model>;
}) {
  Channels.hasOne(ModbusChannels, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  ModbusChannels.belongsTo(Channels, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  Protocols.hasOne(ModbusProtocols, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  ModbusProtocols.belongsTo(Protocols, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
}
export default ModbusPlugin;
