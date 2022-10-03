module.exports = async ({ models }) => {
  const { Services, APIs, Metadata, Channels, Protocols, RESTs } = models;

  Services.hasMany(APIs, { onDelete: "CASCADE", onUpdate: "CASCADE" });
  APIs.belongsTo(Services, { onDelete: "CASCADE", onUpdate: "CASCADE" });

  APIs.hasOne(RESTs, { onDelete: "CASCADE", onUpdate: "CASCADE" });
  RESTs.belongsTo(APIs, { onDelete: "CASCADE", onUpdate: "CASCADE" });
  Services.hasMany(Metadata, { onDelete: "CASCADE", onUpdate: "CASCADE" });
  Metadata.belongsTo(Services, { onDelete: "CASCADE", onUpdate: "CASCADE" });

  Services.hasMany(Channels, { onDelete: "CASCADE", onUpdate: "CASCADE" });
  Channels.belongsTo(Services, { onDelete: "CASCADE", onUpdate: "CASCADE" });

  Services.hasMany(Protocols, { onDelete: "CASCADE", onUpdate: "CASCADE" });
  Protocols.belongsTo(Services, { onDelete: "CASCADE", onUpdate: "CASCADE" });
};
