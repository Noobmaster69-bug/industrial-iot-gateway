import type { Model, ModelStatic } from "sequelize";
import { MainfluxProtocol } from "./mainflux.models";
import mqtt from "mqtt";
export async function mainfluxInit({
  Protocols,
}: {
  Protocols: ModelStatic<Model>;
}) {
  Protocols.hasOne(MainfluxProtocol);
  MainfluxProtocol.belongsTo(Protocols);
  await MainfluxProtocol.sync();
  const connections = await MainfluxProtocol.findAll();
  for (const connection of connections) {
    mqtt.connect({
      protocolVersion: 4,
      username: connection.thingId,
      password: connection.thingKey,
      host: connection.host,
      port: connection.port,
    });
  }
}

class MainfluxPlugin {
  public static async up(protocol: any, data: any) {
    console.log({ protocol, data });
  }
  public static async getProperties() {
    return {
      name: "mainflux",
      protocol: {
        thingId: {
          type: "STRING",
        },
        thingKey: {
          type: "STRING",
        },
        channelId: {
          type: "STRING",
        },
        host: {
          type: "STRING",
        },
      },
      Protocols: MainfluxProtocol,
      plugin: MainfluxPlugin,
    };
  }
}
export default MainfluxPlugin;
