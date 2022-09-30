module.exports = function (app, express) {
  app.use(
    require("cors")({ origin: "http://localhost:3000", credentials: true })
  );
  app.use(express.json()); // for parsing application/json
  app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
  app.use(require("cookie-parser")());

  // require("./auth")(app);
  if (process.env.DEV === "true") {
    const morgan = require("morgan");
    app.use(
      morgan(":method :url :status :res[content-length] - :response-time ms")
    );
  }
};
