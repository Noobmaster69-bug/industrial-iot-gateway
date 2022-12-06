import type { Model, ModelStatic } from "sequelize";
import MainfluxPlugin, { mainfluxInit } from "./Mainflux";

class northBound {
  public static async list() {
    return await Promise.all(
      [MainfluxPlugin].map((plugin) => {
        return plugin.getProperties();
      })
    );
  }
  public static async getPlugin(name: string | undefined) {
    const plugins = await this.list();
    return plugins.find((plugin) => plugin.name === name);
  }
  public static async northBoundInit({
    Protocols,
  }: {
    Protocols: ModelStatic<Model>;
  }) {
    await mainfluxInit({
      Protocols,
    });
  }
}
export default northBound;
