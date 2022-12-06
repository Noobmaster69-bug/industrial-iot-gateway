import { RandomChannel, RandomProtocol } from "./models";
import { Channels, Protocols } from "devices";
export async function randomInit() {
  Channels.hasOne(RandomChannel);
  RandomChannel.belongsTo(Channels);

  Protocols.hasOne(RandomProtocol);
  RandomProtocol.belongsTo(Protocols);

  await RandomChannel.sync();
  await RandomProtocol.sync();

  await Channels.sync();
  await Protocols.sync();
}
