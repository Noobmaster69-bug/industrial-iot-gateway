import type { Express } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
let io: Server | undefined = undefined;
export async function SocketInit(app: Express, port: number) {
  return new Promise((resolve) => {
    const httpServer = createServer(app);
    io = new Server(httpServer, {});

    httpServer.listen(port, () => {
      resolve(io);
    });
  });
}
export default io;
