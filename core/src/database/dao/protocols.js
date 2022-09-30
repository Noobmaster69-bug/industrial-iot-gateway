module.exports = (sequelize) => {
  return {
    async create(protocol) {
      const { name, ServiceId, ...protocolField } = protocol;
      const { Protocols } = sequelize.models;
      try {
        await sequelize.transaction(async (t) => {
          await Protocols.create(
            {
              name,
              ServiceId,
              [`Protocol_${ServiceId}`]: {
                ...protocolField,
              },
            },
            { include: Object.values(Protocols.associations) }
          );
        });
      } catch (err) {
        throw err;
      }
    },
  };
};
