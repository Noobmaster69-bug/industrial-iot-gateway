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
      const { Services } = sequelize.models;
    },
  };
};
