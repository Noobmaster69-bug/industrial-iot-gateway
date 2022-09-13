module.exports = function (app, express) {
  app.use(express.json()); // for parsing application/json
  app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
  if (process.env.DEV === "true") {
    const morgan = require("morgan");
    app.use(
      morgan(":method :url :status :res[content-length] - :response-time ms")
    );
  }
};
