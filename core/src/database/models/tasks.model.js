module.exports = async (sequelize, DataTypes) => {
  sequelize.define(
    "RecurringTasks",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      DeviceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      interval: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      startTime: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      timestamps: false,
    }
  );
};
