module.exports = function (app) {
  app.use("/", require("./auth.router")(app));
  app.use("/api/devices", require("./devices.router")());
  app.use("/api/models", require("./models.router")());
};
