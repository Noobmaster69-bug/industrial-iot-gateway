import { RandomChannels, RandomProtocols } from "./random.models";
import type { Model, ModelStatic } from "sequelize";
import RandomPlugin from "./random";

export { default as routes } from "./random.routes";

export async function randomInit({
  Channels,
  Protocols,
}: {
  Channels: ModelStatic<Model>;
  Protocols: ModelStatic<Model>;
}) {
  Channels.hasOne(RandomChannels, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  RandomChannels.belongsTo(Channels, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  Protocols.hasOne(RandomProtocols, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  RandomProtocols.belongsTo(Protocols, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
}
export default RandomPlugin;
