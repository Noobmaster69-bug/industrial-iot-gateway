import { Users, init as UserModelInit } from "./models";

//export

export async function UserInit() {
  await UserModelInit();
}

export { Users };

export { default as routes } from "./routes";
