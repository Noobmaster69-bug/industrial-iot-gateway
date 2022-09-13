module.exports = (sequelize) => {
  return {
    async create(device) {
      const { Devices } = sequelize.models;
      try {
        await Devices.create(device);
      } catch (err) {
        throw err;
      }
    },
    async createBulk(devices) {
      const { Devices } = sequelize.models;
      try {
        await Devices.bulkCreate(devices);
      } catch (err) {
        throw err;
      }
    },
    async getAll(scope) {
      const { Devices } = sequelize.models;
      try {
        return await Devices.scope(scope || "channels").findAll();
      } catch (err) {
        throw err;
      }
    },
    async delete(id) {
      const { Devices } = sequelize.models;
      try {
        await Devices.destroy({
          where: {
            id,
          },
        });
      } catch (err) {
        throw err;
      }
    },
    async count() {
      const { Devices } = sequelize.models;
      try {
        const { count, rows } = await Devices.findAndCountAll();
        return count;
      } catch (err) {
        throw err;
      }
    },
  };
};
