module.exports = (sequelize, DataTypes) => {
  sequelize.define(
    "Templates",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      ServiceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      manufacture: {
        type: DataTypes.STRING,
      },
      type: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
      scopes: {
        defaults: {
          where: {},
        },
        channels() {
          const { Channels } = sequelize.models;
          const associate = Object.keys(Channels).filter((e) => e !== "Models");
          return {
            include: [
              {
                model: Channels,
                include: associate,
              },
            ],
          };
        },
      },
    }
  );
};
