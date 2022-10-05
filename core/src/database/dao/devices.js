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
  async createBulk(devices) {
    const { Devices } = sequelize.models;
    try {
      await Devices.bulkCreate(devices);
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
      const queryResult = this.#queryParser(
        (await Devices.scope("basic").findByPk(id)).toJSON()
      );
      return queryResult;
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
        ServiceId: upProtocol.ServiceId,
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
