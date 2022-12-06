import type { Model, ModelStatic } from "sequelize";
import { randomInit } from "./Random";
import RandomPlugin from "./Random";
class SouthBound {
  public static async list() {
    return await Promise.all(
      [RandomPlugin].map((plugin) => {
        return plugin.getProperties();
      })
    );
  }
  public static async getPlugin(name: string | undefined) {
    const plugins = await this.list();
    return plugins.find((plugin) => plugin.name === name);
  }
  public static async southBoundInit({
    Channels,
    Protocols,
  }: {
    Channels: ModelStatic<Model>;
    Protocols: ModelStatic<Model>;
  }) {
    await randomInit({
      Channels,
      Protocols,
    });
  }
}
export default SouthBound;
