module.exports = (sequelize, DataTypes) => {
  sequelize.define(
    "Channels",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
      DeviceId: {
        type: DataTypes.INTEGER,
      },
      TemplateId: {
        type: DataTypes.INTEGER,
      },
      ServiceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      validate: {
        FoiregnKey() {
          if (this.ModelId === null && this.DeviceId === null) {
            throw new Error("ModelId and DeviceId cannot both null");
          }
        },
      },
      indexes: [
        { unique: true, fields: ["name", "DeviceId"] },
        { unique: true, fields: ["name", "TemplateId"] },
      ],
    }
  );
};
