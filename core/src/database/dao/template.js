module.exports = (sequelize) => {
  return {
    async create(model) {
      let { channels, protocol, ...modelFields } = model;
      const { Templates, Channels, Services } = sequelize.models;
      const Service = await Services.findOne({
        where: {
          name: protocol,
        },
      });
      channels = channels.map(
        ({ name, readWrite, offset, scale, precision, ...channel_ }) => {
          return {
            ServiceId: Service.id,
            name,
            readWrite,
            offset,
            scale,
            precision,
            [`Channel_${Service.id}`]: channel_,
          };
        }
      );
      try {
        await sequelize.transaction(async (t) => {
          await Templates.create(
            { ServiceId: Service.id, ...modelFields, Channels: channels },
            {
              include: [
                {
                  model: Channels,
                  include: Channels.associations[`Channel_${Service.id}`],
                },
              ],
              transaction: t,
            }
          );
        });
      } catch (err) {
        throw err;
      }
    },
    async getAll(scope) {
      const { Templates, Channels, Services } = sequelize.models;
      try {
        return await Templates.scope(scope || 0).findAll();
      } catch (err) {
        throw err;
      }
    },
  };
};
