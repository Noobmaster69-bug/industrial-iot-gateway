module.exports = async function (sequelize, DataTypes) {
  const bcrypt = require("bcrypt");
  sequelize.define(
    "Accounts",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          const result = bcrypt.hashSync(value, bcrypt.genSaltSync(8));
          this.setDataValue("password", result);
        },
      },
      role: {
        type: DataTypes.ENUM,
        values: ["admin"],
      },
    },
    {
      timestamps: false,
    }
  );
};
