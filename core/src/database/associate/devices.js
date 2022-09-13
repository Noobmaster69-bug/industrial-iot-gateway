module.exports = async ({ models }) => {
  const { Channels, Protocols, Devices, Models } = models;
  Models.hasMany(Devices);
  Devices.belongsTo(Models);

  Protocols.hasMany(Devices, {
    foreignKey: "upProtocolId",
  });
  Devices.belongsTo(Protocols, {
    as: "upProtocol",
  });

  Protocols.hasOne(Devices, {
    foreignKey: "downProtocolId",
  });
  Devices.belongsTo(Protocols, {
    as: "downProtocol",
  });

  Models.hasMany(Channels);
  Channels.belongsTo(Models);
};
