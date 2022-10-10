const express = require("express");
const app = express();
(async () => {
  const config = await require("./src/database/").sync();
  const { http_port, https_port, ssl } = config.toJSON();
  require("./src/middleware")(app, express);
  require("./src/router")(app, express);

  if (ssl) {
    const https_server = require("https").createServer(config.getSSL(), app);
    require("./src/io")(https_server);
    https_server.listen(https_port);
  }
  const http_server = require("http").createServer(app);
  require("./src/io")(http_server);
  http_server.listen(http_port);
  return { http_port, https_port, ssl };
})()
  .then(({ ssl, http_port, https_port }) => {
    console.log(
      `core is listening on port ${http_port}(http)${
        ssl ? ` and ${https_port}(https)` : ""
      }`
    );
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
