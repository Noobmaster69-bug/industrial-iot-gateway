import type { Express } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
let io: Server | undefined = undefined;
export async function SocketInit(app: Express) {
  const httpServer = createServer(app);
  io = new Server(httpServer, {});
  return httpServer;
}
export default io;
