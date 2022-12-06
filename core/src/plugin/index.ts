import { southBoundInit } from "./southBound";
export async function pluginInit() {
  await southBoundInit();
}
