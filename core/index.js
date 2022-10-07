const express = require("express");
const app = express();
const fs = require("fs");
if (!process.env.DEV) {
  require("dotenv").config({ path: "./.env.production" });
}
const port = process.env.PORT || 33333;
(async () => {
  await require("./src/database/").sync();
  //config middleware
  require("./src/middleware")(app, express);
  //config route
  require("./src/router")(app, express);

  let server;
  if (!process.env.DEV) {
    const https = require("https");
    server = https.createServer(
      {
        key: fs.readFileSync("./ssl/private.key"),
        cert: fs.readFileSync("./ssl/certificate.crt"),
        ca: [fs.readFileSync("./ssl/ca_bundle.crt")],
      },
      app
    );
  } else {
    const http = require("http");
    server = http.createServer(app);
  }
  const io = require("socket.io")(server, {
    cors: {
      methods: ["GET", "POST"],
      origin: process.env.ORIGIN || "http://localhost:3000",
      credentials: true,
    },
  });
  server.listen(port, "0.0.0.0");
  io.use((socket, next) => {
    const cookie = require("cookie");
    const jwt = require("jsonwebtoken");
    const { __config = {} } = global;
    const jwtOptions = __config;
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
    require("./src/io")(client);
  });
  process.on("__log", (msg) => {
    io.emit("__log", msg);
  });
  process.on("__error", (msg) => {
    io.emit("__error", msg);
  });
})()
  .then(() => console.log("core is listening on port " + port))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
