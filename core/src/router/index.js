module.exports = function (app) {
  app.use("/login", require("./auth.router")(app));
  app.use("/api/devices", require("./devices.router")());
  app.use("/api/models", require("./models.router")());
  app.use("/api/services", require("./services.router")());
};
