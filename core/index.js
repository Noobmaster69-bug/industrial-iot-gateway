(async () => {
  const express = require("express");
  const app = express();
  // init database, load system config
  const config = await require("./src/database/").sync();
  const { http_port, https_port, ssl, secretOrKey, origin } = config.toJSON();

  //config express middlewares and routers
  require("./src/middleware")(app, express, secretOrKey, origin);
  require("./src/router")(app, secretOrKey);

  //config https server if ssl is allowed
  if (ssl) {
    const https_server = require("https").createServer(config.getSSL(), app);
    require("./src/io")(https_server, secretOrKey, origin);
    https_server.listen(https_port);
  }

  //config http server
  const http_server = require("http").createServer(app);
  require("./src/io")(http_server, secretOrKey, origin);
  http_server.listen(http_port);

  //load utilities
  require("./src/utilities")(config);

  console.log(
    `core is listening on port ${http_port}(http)${
      ssl ? ` and ${https_port}(https)` : ""
    }`
  );
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
