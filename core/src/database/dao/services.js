module.exports = (sequelize) => {
  return {
    async create(service) {
      const { Services, APIs, Metadata } = sequelize.models;
      try {
        await sequelize.transaction(async (t) => {
          await Services.create(service, {
            include: [
              {
                model: APIs,
                include: Object.values(APIs.associations),
              },
              {
                model: Metadata,
              },
            ],
            transaction: t,
          });
        });
      } catch (err) {
        throw err;
      }
    },
    async createBulk(services) {
      const { Services, APIs, Metadata } = sequelize.models;
      try {
        await sequelize.transaction(async (t) => {
          await Services.bulkCreate(services, {
            include: [
              {
                model: APIs,
                include: Object.values(APIs.associations),
              },
              {
                model: Metadata,
              },
            ],
            transaction: t,
          });
        });
      } catch (err) {
        throw err;
      }
    },
    async getAll() {
      const { Services, Metadata } = sequelize.models;
      let result = (
        await Services.findAll({
          include: {
            model: Metadata,
          },
        })
      )
        .map((e) => e.toJSON())
        .map((e) => {
          e.channelsProps = e.Metadata.filter(
            (datum) => datum.kind === "channel"
          );
          e.protocolProps = e.Metadata.filter(
            (datum) => datum.kind === "protocol"
          );
          delete e.Metadata;
          return e;
        });

      return result;
    },
    async getDeviceProtocol() {
      const { Services, Metadata } = sequelize.models;
      let result = await Services.findAll({
        where: { type: "downService" },
        include: {
          model: Metadata,
        },
      });

      return result;
    },
  };
};
