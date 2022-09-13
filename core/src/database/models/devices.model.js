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
      },
      upProtocolId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      downProtocolId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      isProvision: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      ModelId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      scopes: {
        channels() {
          const { Models } = sequelize.models;
          return {
            include: [
              {
                model: Models,
                include: Object.values(Models.associations),
              },
            ],
          };
        },
        model() {
          const { Models } = sequelize.models;
          return {
            include: [
              {
                model: Models,
              },
            ],
          };
        },
      },
    }
  );
};
