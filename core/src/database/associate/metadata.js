module.exports = async function (sequelize, DataTypes) {
  const { Services, Metadata, Channels, Protocols } = sequelize.models;
  const services = await Services.findAll({ include: [Metadata] });
  for (const service of services) {
    const modelChannels = service.Metadata.filter((e) => e.kind === "channel");
    if (modelChannels.length !== 0) {
      let schema = modelChannels.reduce(
        (a, { key, type, values, allowNull, defaultValue, unique }) => {
          return {
            ...a,
            [key]: {
              type: DataTypes[type],
              values,
              allowNull,
              defaultValue,
              unique,
            },
          };
        },
        {}
      );
      const channel = sequelize.define(`Channel_${service.id}`, schema, {
        timestamps: false,
      });
      Channels.hasOne(channel, { onDelete: "CASCADE", onUpdate: "CASCADE" });
      channel.belongsTo(Channels, { onDelete: "CASCADE", onUpdate: "CASCADE" });
      await Channels.sync();
      await channel.sync();
    }

    const protocolConfigs = service.Metadata.filter(
      (e) => e.kind === "protocol"
    );
    schema = protocolConfigs.reduce(
      (a, { key, type, values, allowNull, defaultValue, unique }) => {
        return {
          ...a,
          [key]: {
            type: DataTypes[type],
            values,
            allowNull,
            defaultValue,
            unique,
          },
        };
      },
      {}
    );
    const configs = sequelize.define(`Protocol_${service.id}`, schema, {
      timestamps: false,
    });
    Protocols.hasOne(configs, { onDelete: "CASCADE", onUpdate: "CASCADE" });
    configs.belongsTo(Protocols, { onDelete: "CASCADE", onUpdate: "CASCADE" });
    await Protocols.sync();
    await configs.sync();
  }
};
