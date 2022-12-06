import { RandomChannels, RandomProtocols } from "./random.models";
import type { Model, ModelStatic } from "sequelize";
export { default as routes } from "./random.routes";

export async function randomInit({
  Channels,
  Protocols,
}: {
  Channels: ModelStatic<Model>;
  Protocols: ModelStatic<Model>;
}) {
  Channels.hasOne(RandomChannels);
  RandomChannels.belongsTo(Channels);

  Protocols.hasOne(RandomProtocols);
  RandomProtocols.belongsTo(Protocols);

  await RandomChannels.sync();
  await RandomProtocols.sync();

  await Channels.sync();
  await Protocols.sync();
}

interface RandomProtocol {
  seed: number;
}
interface RandomChannel {
  max: number;
  min: number;
}
class RandomPlugin {
  public async get(protocol: RandomProtocol, channels: Array<RandomChannel>) {
    const { seed } = protocol;
    return await Promise.all(
      channels.map(({ max, min }) => {
        return Promise.resolve(seed * (Math.random() * (max - min) + min));
      })
    );
  }
  public async set(_protocol: RandomChannel, _channels: Array<RandomChannel>) {
    return await Promise.reject("No set method for this plugin");
  }
  public static async getProperties() {
    return await Promise.resolve({
      name: "random",
      channels: {
        max: {
          type: "REAL",
        },
        main: {
          type: "REAL",
        },
      },
      protocols: {
        seed: {
          type: "REAL",
        },
      },
      Channels: RandomChannels,
      Protocols: RandomProtocols,
    });
  }
}
export default RandomPlugin;
