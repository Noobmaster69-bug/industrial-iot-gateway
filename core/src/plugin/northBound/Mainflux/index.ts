import type { Model, ModelStatic } from "sequelize";
import { MainfluxProtocol } from "./mainflux.models";
import Mainflux from "./mainflux";
export async function mainfluxInit({
  Protocols,
}: {
  Protocols: ModelStatic<Model>;
}) {
  Protocols.hasOne(MainfluxProtocol, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  MainfluxProtocol.belongsTo(Protocols, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  await MainfluxProtocol.sync();
  const connections = await MainfluxProtocol.findAll();
  for (const connection of connections) {
    Mainflux.addConnection(connection.toJSON());
  }
}

class MainfluxPlugin {
  public static async up(protocol: any, data: any) {
    Mainflux.publish(protocol, data);
  }
  public static async getProperties() {
    return {
      name: "mainflux",
      protocols: {
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
        protocol: {
          type: "ENUM",
          values: ["mqtt", "mqtts"],
        },
      },
      Protocols: MainfluxProtocol,
      plugin: MainfluxPlugin,
    };
  }
}
export default MainfluxPlugin;
