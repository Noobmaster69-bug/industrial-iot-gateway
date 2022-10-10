/**
 * @typedef {import('sequelize/types').Sequelize} sequelize
 * @typedef {import('sequelize/types').DataTypes} DataTypes
 * @typedef {import('sequelize/types').Model} Model
 */

/**
 *
 * @param {sequelize} sequelize
 * @param {DataTypes} DataTypes
 * @param {Model} Model
 * @returns {import('sequelize/types').ModelCtor}
 */
module.exports = async function (sequelize, DataTypes, Model) {
  class Configuration extends Model {
    toJSON() {
      const values = this.get();
      return JSON.parse(
        JSON.stringify(values, (k, v) => (v === null ? undefined : v))
      );
    }
    getSSL() {
      const { key, cert, ca } = this.toJSON();
      const result = { key, cert };
      if (ca) {
        result.ca = ca;
      }
      return result;
    }
  }
  Configuration.init(
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
      origin: {
        type: DataTypes.STRING,
      },
      ssl: {
        type: DataTypes.VIRTUAL,
        get() {
          if (this.getDataValue("https_port")) {
            return true;
          } else return false;
        },
      },
      http_port: {
        type: DataTypes.INTEGER,
      },
      https_port: {
        type: DataTypes.INTEGER,
      },
      cert: {
        type: DataTypes.STRING,
      },
      key: {
        type: DataTypes.STRING,
      },
      ca: {
        type: DataTypes.STRING,
        set(value) {
          this.setDataValue("ca", JSON.stringify(value));
        },
        get() {
          if (this.getDataValue("ca")) {
            return JSON.parse(this.getDataValue("ca"));
          } else return null;
        },
      },
      secretOrKey: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Configuration",
      freezeTableName: true,
      timestamps: false,
      validate: {
        server() {
          if (this.http === null && this.https === null) {
            throw new Error("Once of http or https must be true");
          }
        },
        https_constrain() {
          if (this.https_port !== null) {
            if (this.cert === null && this.key === null) {
              throw new Error("SSL CERT and KEY are not valid");
            }
          }
        },
      },
    }
  );
  return Configuration;
};
