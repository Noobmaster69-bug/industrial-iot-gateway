/**
 * @typedef {import('sequelize/types')} sequelize
 * @typedef {{ServiceId: number, name: string, ...other}} protocol
 * @typedef {{name: string, readWrite: string, offset: number, scale: number, precision: number, TemplateId: number}} channel
 * @typedef {{name: string, modelName: string, manufacturer: string, type: string, upProtocol: protocol, downProtocol: protocol, channels: Array.<channel>}} DeviceDTO
 */
class Devices {
  /**
   *
   * @param {sequelize} sequelize
   */
  constructor(sequelize) {
    this.sequelize = sequelize;
  }
  /**
   *
   * @param {DeviceDTO} input
   */
  async create(DeviceDTO) {
    const { Devices, Protocols, Channels } = this.sequelize.models;
    try {
      let { upProtocol, downProtocol, channels, ...device } = DeviceDTO;
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
          }) => ({
            name,
            readWrite,
            offset,
            scale,
            precision,
            TemplateId,
            ServiceId: downProtocol.ServiceId,
            [`Channel_${downProtocol.ServiceId}`]: channelProps,
          })
        );
      }
      await this.sequelize.transaction(async (t) => {
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
                  Protocols.associations[`Protocol_${downProtocol.ServiceId}`],
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
  }
  /**
   *
   * @param {Array.<DeviceDTO>} devices
   * @returns
   */
  async createBulk(devices) {
    const { Devices } = this.sequelize.models;
    try {
      for (const device of devices) {
        await this.create(device);
      }
    } catch (err) {
      throw err;
    }
  }
  /**
   *
   * @param {{id: number}} device
   * @returns
   */
  async update(device) {
    const { Devices } = this.sequelize.models;
    try {
      await this.sequelize.transaction(async (t) => {
        const Device = await Devices.scope("basic").findByPk(device.id);
        const { upProtocol, downProtocol, channels, ...DeviceProps } = device;
        Device.set(DeviceProps);
        await Device.save({ transaction: t });

        //handle upProtocol
        if (upProtocol) {
          let { name, id, ServiceId, Service, ...otherProps } = upProtocol;
          Device.upProtocol.name = name;
          await Device.upProtocol.save({ transaction: t });
          if (ServiceId !== Device.upProtocol.ServiceId) {
            //Change protocol

            await Device.upProtocol[
              `Protocol_${Device.upProtocol.ServiceId}`
            ].destroy({
              truncate: true,
              transaction: t,
            });
            await Device.upProtocol[`createProtocol_${ServiceId}`](otherProps, {
              transaction: t,
            });
            Device.upProtocol.ServiceId = ServiceId;
            await Device.upProtocol.save({ transaction: t });
          } else {
            Device.upProtocol[`Protocol_${ServiceId}`].set(otherProps);
            await Device.upProtocol[`Protocol_${ServiceId}`].save({
              transaction: t,
            });
          }
        }
        //handle downProtocol
        if (downProtocol) {
          let { name, id, ServiceId, Service, ...otherProps } = downProtocol;
          Device.downProtocol.name = name;
          await Device.upProtocol.save({ transaction: t });
          if (ServiceId !== Device.downProtocol.ServiceId) {
            //Change protocol

            await Device.downProtocol[
              `Protocol_${Device.downProtocol.ServiceId}`
            ].destroy({
              truncate: true,
              transaction: t,
            });
            await Device.downProtocol[`createProtocol_${ServiceId}`](
              otherProps,
              {
                transaction: t,
              }
            );
            Device.downProtocol.ServiceId = ServiceId;
            await Device.downProtocol.save({ transaction: t });
            for (const Channel in Device.Channels) {
              await Channel.destroy({ transaction: t });
            }
          } else {
            Device.downProtocol[`Protocol_${ServiceId}`].set(otherProps);
            await Device.downProtocol[`Protocol_${ServiceId}`].save({
              transaction: t,
            });
          }
        }
        //handle channels
        if (channels) {
          const { Channels } = this.sequelize.models;
          for (const channel of channels) {
            const { name, scale, readWrite, precision, offset, ...otherProps } =
              channel;
            const cn = await Channels.findOne({
              where: { id: channel.id || -1, DeviceId: device.id },
              include:
                Channels.associations[
                  `Channel_${Device.downProtocol.ServiceId}`
                ],
            });
            if (cn) {
              cn.set({ name, scale, readWrite, precision, offset });
              await cn.save({ transaction: t });
              cn[`Channel_${Device.downProtocol.ServiceId}`].set(otherProps);
              await cn[`Channel_${Device.downProtocol.ServiceId}`].save({
                transaction: t,
              });
            } else {
              await Channels.create(
                {
                  name,
                  scale,
                  readWrite,
                  precision,
                  offset,
                  DeviceId: device.id,
                  ServiceId: Device.downProtocol.ServiceId,
                  [`Channel_${Device.downProtocol.ServiceId}`]: otherProps,
                },
                {
                  include:
                    Channels.associations[
                      `Channel_${Device.downProtocol.ServiceId}`
                    ],
                  transaction: t,
                }
              );
            }
          }
        }
      });
    } catch (err) {
      throw err;
    }
  }
  /**
   *
   * @returns {Promise<Array.<DeviceDTO>}
   */
  async getAll() {
    const { Devices } = this.sequelize.models;
    try {
      const queryResult = (await Devices.scope("basic").findAll())
        .map((result) => result.toJSON())
        .map(this.#queryParser);
      return queryResult;
    } catch (err) {
      throw err;
    }
  }
  async get(id) {
    const { Devices } = this.sequelize.models;
    try {
      const queryResult = await Devices.scope("basic").findByPk(id);
      if (queryResult) {
        return this.#queryParser(queryResult.toJSON());
      }
      throw Error(404);
    } catch (err) {
      throw err;
    }
  }
  /**
   *
   * @param {number} id
   * @return {boolean}
   */
  async delete(id) {
    const { Devices } = this.sequelize.models;
    try {
      await Devices.destroy({
        where: {
          id,
        },
      });
      return true;
    } catch (err) {
      throw err;
    }
  }
  /**
   *
   * @returns {number}
   */
  async count() {
    const { Devices } = this.sequelize.models;
    try {
      const { count } = await Devices.findAndCountAll();
      return count;
    } catch (err) {
      throw err;
    }
  }
  /**
   *
   * @param {*} device
   * @returns {DeviceDTO}
   */
  #queryParser(device) {
    // return device;
    const {
      upProtocol,
      downProtocol,
      Channels: channels,
      ...otherProps
    } = device;
    const {
      id: {},
      ProtocolId: {},
      ...upProtocolProps
    } = upProtocol[`Protocol_${upProtocol.ServiceId}`];
    const {
      id: {},
      ProtocolId: {},
      ...downProtocolProps
    } = downProtocol[`Protocol_${downProtocol.ServiceId}`];
    return {
      ...otherProps,
      upProtocol: {
        name: upProtocol.name,
        id: upProtocol.id,
        ServiceId: upProtocol.ServiceId,
        Service: { name: upProtocol.Service.name },
        ...upProtocolProps,
      },
      downProtocol: {
        name: downProtocol.name,
        id: downProtocol.id,
        ServiceId: downProtocol.ServiceId,
        Service: { name: downProtocol.Service.name },
        ...downProtocolProps,
      },
      channels: channels.map((channel) => {
        const {
          id: {},
          ChannelId: {},
          ...channelProps
        } = channel[`Channel_${channel.ServiceId}`];
        return {
          name: channel.name,
          readWrite: channel.readWrite,
          offset: channel.offset,
          scale: channel.scale,
          precision: channel.precision,
          ...channelProps,
        };
      }),
    };
  }
}
module.exports = (sequelize) => {
  return new Devices(sequelize);
};
