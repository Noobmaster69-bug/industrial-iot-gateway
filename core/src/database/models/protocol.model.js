module.exports = (sequelize, DataTypes) => {
  sequelize.define(
    "Protocols",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      ServiceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        get() {
          return (
            this.getDataValue("name") || `connection ${this.getDataValue("id")}`
          );
        },
      },
    },
    {
      timestamps: false,
    }
  );
};
