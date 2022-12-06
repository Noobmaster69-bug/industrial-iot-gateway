import { Devices, Channels, Protocols } from "./models";
import { pluginInit } from "plugin";
import { Schedules } from "scheduler/scheduler.models";
import { sequelize } from "ultils";
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
  Devices.hasMany(Schedules);
  Schedules.belongsTo(Devices);

  Schedules.belongsToMany(Channels, { through: "SchedulerChannels" });
  Channels.belongsToMany(Schedules, { through: "SchedulerChannels" });

  await pluginInit({ Channels, Protocols });
  await sequelize.sync();
}
export { Devices, Channels, Protocols };
export { default as routes } from "./devices.routes";
