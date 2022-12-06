import { Devices, Channels, Protocols, init } from "./models";
export async function DevicesInit() {
  await init();
}
export { Devices, Channels, Protocols };
