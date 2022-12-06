import { RandomChannels, RandomProtocols } from "./random.models";

// interface
interface RandomProtocol {
  seed: number;
}
interface RandomChannel {
  max: number;
  min: number;
}

class RandomPlugin {
  public static async get(
    protocol: RandomProtocol,
    channels: Array<RandomChannel>
  ) {
    const { seed } = protocol;
    return await Promise.all(
      channels.map(({ max, min, ...channel }) => {
        return Promise.resolve({
          value: seed * (Math.random() * (max - min) + min),
          ...channel,
        });
      })
    );
  }
  public static async set(
    _protocol: RandomChannel,
    _channels: Array<RandomChannel>
  ) {
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
      plugin: RandomPlugin,
    });
  }
}
export default RandomPlugin;
