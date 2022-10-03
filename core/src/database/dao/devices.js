module.exports = (sequelize) => {
  return {
    async create(input) {
      const { Devices, Protocols, Channels } = sequelize.models;
      try {
        let { upProtocol, downProtocol, channels, ...device } = input;
        //handle upProtocol
        {
          let { name, ServiceId, ...protocolProps } = upProtocol;
          upProtocol[`Protocol_${ServiceId}`] = protocolProps;
        }
        //handle downProtocol
        {
          let { name, ServiceId, ...protocolProps } = downProtocol;
          downProtocol[`Protocol_${ServiceId}`] = protocolProps;
        }
        //handle channel
        {
          channels = channels.map(
            ({
              name,
              readWrite,
              offset,
              scale,
              precision,
              TemplateId,
              ...channelProps
            }) => {
              return {
                name,
                readWrite,
                offset,
                scale,
                precision,
                TemplateId,
                ServiceId: downProtocol.ServiceId,
                [`Channel_${downProtocol.ServiceId}`]: channelProps,
              };
            }
          );
        }
        await sequelize.transaction(async (t) => {
          await Devices.create(
            { ...device, Channels: channels, upProtocol, downProtocol },
            {
              include: [
                {
                  model: Protocols,
                  as: "upProtocol",
                  include:
                    Protocols.associations[`Protocol_${upProtocol.ServiceId}`],
                },
                {
                  model: Protocols,
                  as: "downProtocol",
                  include:
                    Protocols.associations[
                      `Protocol_${downProtocol.ServiceId}`
                    ],
                },
                {
                  model: Channels,
                  include:
                    Channels.associations[`Channel_${downProtocol.ServiceId}`],
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
