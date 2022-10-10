module.exports = (sequelize, DataTypes) => {
  sequelize.define(
    "APIs",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      ServiceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: "ipc",
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      protocol: {
        type: DataTypes.ENUM,
        values: ["REST"],
        allowNull: false,
        defaultValue: "REST",
      },
      kind: {
        type: DataTypes.ENUM,
        values: ["IPC", "Command"],
        allowNull: false,
        unique: "ipc",
      },
      type: {
        type: DataTypes.ENUM,
        values: ["SET", "GET"],
        allowNull: false,
        unique: "ipc",
      },
    },
    {
      timestamps: false,
      scopes: {
        API() {
          const { APIs } = sequelize.model;
          return {
            include: APIs.associations,
          };
        },
      },
    }
  );
  sequelize.define(
    "RESTs",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      method: {
        type: DataTypes.ENUM,
        values: ["GET", "POST", "PUT", "DELETE"],
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
