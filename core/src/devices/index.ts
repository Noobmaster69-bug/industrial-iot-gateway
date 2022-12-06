import { Devices, Channels, Protocols } from "./models";
import { pluginInit } from "plugin";
export async function DevicesInit() {
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
  pluginInit({ Channels, Protocols });
  await Devices.sync();
  await Channels.sync();
  await Protocols.sync();
}
export { Devices, Channels, Protocols };
export { default as routes } from "./devices.routes";
