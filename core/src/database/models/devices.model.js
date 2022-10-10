/**
 * @typedef {import('sequelize/types').Sequelize} sequelize
 * @typedef {import('sequelize/types').DataTypes} DataTypes
 * @typedef {import('sequelize/types').Model} Model
 */

/**
 *
 * @param {sequelize} sequelize
 * @param {DataTypes} DataTypes
 * @param {Model} Model
 * @returns {import('sequelize/types').ModelCtor}
 */
module.exports = (sequelize, DataTypes, Model) => {
  class Devices extends Model {
    toJSON() {
      const values = this.get();
      return JSON.parse(
        JSON.stringify(values, (k, v) => (v === null ? undefined : v))
      );
    }
  }
  Devices.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      isProvision: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      state: {
        type: DataTypes.STRING,
      },
      modelName: {
        type: DataTypes.STRING,
      },
      manufacturer: {
        type: DataTypes.STRING,
      },
      type: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.VIRTUAL,
        get() {
          if (this.downProtocolId === null || this.upProtocolId === null) {
            return "Config not completed";
          } else {
            return this.state;
          }
        },
      },
    },
    {
      sequelize,
      modelName: "Devices",
      timestamps: false,
      scopes: {
        basic() {
          const { Channels, Protocols } = sequelize.models;
          let ChannelInclude;
          let ProtocolInclude;
          {
            let { Devices, ...ChannelAssociations } = Channels.associations;
            ChannelInclude = Object.values(ChannelAssociations);
          }
          {
            const { Devices, ...ProtocolAssociations } = Protocols.associations;
            ProtocolInclude = Object.values(ProtocolAssociations);
          }
          return {
            include: [
              {
                model: Channels,
                include: ChannelInclude,
              },
              {
                model: Protocols,
                include: ProtocolInclude,
                as: "upProtocol",
              },
              {
                model: Protocols,
                include: ProtocolInclude,
                as: "downProtocol",
              },
            ],
          };
        },
      },
    }
  );
  return Devices;
};
