module.exports = (sequelize, DataTypes) => {
  sequelize.define(
    "Channels",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      ModelId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ServiceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
      },
      readWrite: {
        type: DataTypes.ENUM,
        values: ["R", "W", "RW"],
        defaultValue: "R",
      },
      offset: {
        type: DataTypes.REAL,
        defaultValue: 0,
      },
      scale: {
        type: DataTypes.REAL,
        defaultValue: 1,
      },
      precision: {
        type: DataTypes.REAL,
      },
    },
    {
      timestamps: false,
    }
  );
};
