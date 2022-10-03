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
      // upProtocolId: {
      //   type: DataTypes.INTEGER,
      // },
      // downProtocolId: {
      //   type: DataTypes.INTEGER,
      // },
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
        channels() {
          const { Channels } = sequelize.models;
          return {
            include: [
              {
                model: Channels,
                include: Object.values(Channels.associations),
              },
            ],
          };
        },
        model() {
          const { Protocols } = sequelize.models;
          return {
            include: [
              {
                model: Protocols,
                as: "upProtocol",
                include: Object.values(Protocols.associations),
              },
              {
                model: Protocols,
                as: "downProtocol",
                include: Object.values(Protocols.associations),
              },
            ],
          };
        },
      },
    }
  );
};
