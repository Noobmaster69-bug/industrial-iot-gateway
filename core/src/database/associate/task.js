module.exports = function ({ models }) {
  const { RecurringTasks, Devices, Channels } = models;

  Devices.hasOne(RecurringTasks);
  RecurringTasks.belongsTo(Devices);

  RecurringTasks.belongsToMany(Channels, {
    through: "RecurringChannels",
  });
  Channels.belongsToMany(RecurringTasks, {
    through: "RecurringChannels",
  });
};
