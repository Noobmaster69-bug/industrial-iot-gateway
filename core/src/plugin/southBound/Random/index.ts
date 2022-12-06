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
  Channels.hasOne(RandomChannels);
  RandomChannels.belongsTo(Channels);

  Protocols.hasOne(RandomProtocols);
  RandomProtocols.belongsTo(Protocols);
}
export default RandomPlugin;
