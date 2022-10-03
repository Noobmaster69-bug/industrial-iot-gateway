module.exports = async ({ models }) => {
  const { Channels, Protocols, Devices, Templates } = models;

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

  Templates.hasMany(Channels, { onDelete: "CASCADE", onUpdate: "CASCADE" });
  Channels.belongsTo(Templates, { onDelete: "CASCADE", onUpdate: "CASCADE" });

  Devices.hasMany(Channels, { onDelete: "CASCADE", onUpdate: "CASCADE" });
  Channels.belongsTo(Devices, { onDelete: "CASCADE", onUpdate: "CASCADE" });
};
