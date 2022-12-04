import { Model, DataTypes } from "sequelize";
import { sequelize } from "ultils";
import bcrypt from "bcrypt";

class Users extends Model {
  declare username: string;
  declare password: string;
  declare role: "admin";
  public static async authenticate({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {
    try {
      const user = await this.findOne({
        where: {
          username,
        },
      });
      if (user) {
        if (bcrypt.compareSync(password, user.toJSON().password)) {
          return user;
        } else {
          return null;
        }
      }
      return null;
    } catch (err) {
      throw err;
    }
  }
}
Users.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value: string) {
        const salt = bcrypt.genSaltSync(8);
        const result = bcrypt.hashSync(value, salt);
        this.setDataValue("password", result);
      },
    },
    role: {
      type: DataTypes.ENUM,
      values: ["admin"],
      allowNull: false,
      defaultValue: "admin",
    },
  },
  { sequelize }
);

export async function init() {
  await Users.sync();
}
export { Users };
