import southBound from "./southBound";
import type { Model, ModelStatic } from "sequelize";
export { default as routes } from "./plugin.routes";

export async function pluginInit({
  Channels,
  Protocols,
}: {
  Channels: ModelStatic<Model>;
  Protocols: ModelStatic<Model>;
}) {
  await southBound.southBoundInit({
    Channels,
    Protocols,
  });
}

export { southBound };
