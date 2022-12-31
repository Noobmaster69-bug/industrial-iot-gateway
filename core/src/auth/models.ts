import { Model, DataTypes } from "sequelize";
import { genRSA } from "utils/crypto";
import { sequelize } from "utils/sequelize";

class AuthConfig extends Model {
  declare JwtSecret: string;
  public static async getJwtSecret() {
    const [authConfig] = await AuthConfig.findOrCreate({
      where: {
        id: 1,
      },
      defaults: {
        JwtSecret: await genRSA("string"),
      },
    });
    return authConfig.JwtSecret;
  }
}
AuthConfig.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    JwtSecret: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize }
);

class Blacklist extends Model {
  declare token: string;
  declare tokenExpires: Date | string | number;
}
Blacklist.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tokenExpires: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { sequelize }
);

export { AuthConfig, Blacklist };
export async function AuthModelInit() {
  await AuthConfig.sync();
  await Blacklist.sync();
}
