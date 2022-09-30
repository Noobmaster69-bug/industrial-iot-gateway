module.exports = async ({ models }) => {
  const { Services, APIs, Metadata, Channels, Protocols, RESTs } = models;

  Services.hasMany(APIs);
  APIs.belongsTo(Services);

  APIs.hasOne(RESTs);
  RESTs.belongsTo(APIs);
  Services.hasMany(Metadata);
  Metadata.belongsTo(Services);

  Services.hasMany(Channels);
  Channels.belongsTo(Services);

  Services.hasMany(Protocols);
  Protocols.belongsTo(Services);
};
