module.exports = async function (sequelize, DataTypes) {
  return sequelize.define(
    "Configuration",
    {
      id: {
        type: DataTypes.ENUM,
        values: [1],
        primaryKey: true,
        unique: true,
      },
      logging: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      out_file: {
        type: DataTypes.STRING,
        defaultValue: "./log",
      },
      error_file: {
        type: DataTypes.STRING,
        defaultValue: "./error",
      },
      secretOrKey: {
        type: DataTypes.STRING,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
};
