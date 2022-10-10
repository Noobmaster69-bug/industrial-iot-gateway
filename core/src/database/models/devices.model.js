module.exports = (sequelize, DataTypes) => {
  sequelize.define(
    "Devices",
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
};
