module.exports = async ({ models }) => {
  const { Channels, Protocols, Devices, Templates } = models;

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

  Templates.hasMany(Channels);
  Channels.belongsTo(Templates);

  Devices.hasMany(Channels);
  Channels.belongsTo(Devices);
};
