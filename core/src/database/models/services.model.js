module.exports = (sequelize, DataTypes) => {
  sequelize.define(
    "Services",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      script: {
        type: DataTypes.STRING,
      },
      cwd: {
        type: DataTypes.STRING,
      },
      out_file: {
        type: DataTypes.STRING,
      },
      error_file: {
        type: DataTypes.STRING,
      },
      isManaged: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM,
        values: ["upService", "downService"],
        allowNull: false,
      },
    },
    {
      timestamps: false,
      scopes: {
        service() {
          const { APIs } = sequelize.models;
          return {
            include: [
              {
                model: APIs,
                include: Object.values(APIs.associations),
              },
            ],
          };
        },
      },
      validate: {
        pm2() {
          if (this.isManaged) {
            const notNull =
              this.cwd !== null &&
              this.script !== null &&
              this.out_file !== null &&
              this.error_file !== null;
            if (!notNull)
              throw new Error("cwd,script,out_file,error_file cannot be null");

            const fs = require("fs");
            const cwdExists = fs.existsSync(this.cwd);
            if (!cwdExists) throw new Error("cwd not found");
          }
        },
      },
    }
  );
};
