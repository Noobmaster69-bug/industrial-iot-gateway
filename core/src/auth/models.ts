import { Model, DataTypes } from "sequelize";
import { genRSA } from "ultils";
import { sequelize } from "ultils";

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
export { AuthConfig };
export async function AuthModelInit() {
  await AuthConfig.sync();
}
