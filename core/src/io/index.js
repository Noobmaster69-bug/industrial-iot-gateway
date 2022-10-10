module.exports = async (server, secretOrKey) => {
  const io = require("socket.io")(server, {
    cors: {
      methods: ["GET", "POST"],
      origin: process.env.ORIGIN || "http://localhost:3000",
      credentials: true,
    },
  });
  io.use((socket, next) => {
    const cookie = require("cookie");
    const jwt = require("jsonwebtoken");
    const jwtOptions = { secretOrKey };
    const { token } = cookie.parse(socket.handshake.headers.cookie);
    if (token) {
      const jwt_payload = jwt.verify(token, jwtOptions.secretOrKey);
      if (jwt_payload.id) {
        next();
      } else {
        throw new Error();
      }
    } else {
      throw new Error();
    }
  });

  io.on("connection", (client) => {
    console.log("user connected");
    handler(client);
  });
  process.on("__log", (msg) => {
    io.emit("__log", msg);
  });
  process.on("__error", (msg) => {
    io.emit("__error", msg);
  });
};
const handler = async (socket) => {
  const intervals = [];
  const osu = require("node-os-utils");
  const os = await osu.os.oos();
  socket.emit("performance", {
    ip: osu.os.ip(),
    hostname: osu.os.hostname(),
    platform: osu.os.platform(),
    os,
    type: osu.os.type(),
    arch: osu.os.arch(),
    cpuCount: osu.cpu.count(),
    cpuModel: osu.cpu.model(),
  });
  intervals.push(
    setInterval(async () => {
      let [
        { value: cpu },
        {
          value: { freeMemPercentage: ram, totalMemMb, usedMemMb, freeMemMb },
        },
        {
          value: { usedPercentage: disk },
        },
        {
          value: { total: network },
        },
      ] = await Promise.allSettled([
        osu.cpu.usage(),
        osu.mem.info(),
        osu.drive.info(),
        osu.netstat.inOut(),
      ]);
      // cpu = cpu.avg;
      ram = (100 - ram).toFixed(2);
      socket.emit("network", {
        ...network,
      });
      socket.emit("performance", {
        totalMemMb,
        usedMemMb,
        freeMemMb,
        cpu,
        ram,
        disk,
        ...network,
        uptime: osu.os.uptime().toFixed(),
      });
    }, 1000)
  );
  socket.on("disconnect", () => {
    intervals.forEach((interval) => {
      clearInterval(interval);
    });
  });
};
