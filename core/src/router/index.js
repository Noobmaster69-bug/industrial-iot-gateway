module.exports = function (app, secretOrKey) {
  app.use("/login", require("./auth.router")(secretOrKey));
  app.use("/api/devices", require("./devices.router")());
  app.use("/api/models", require("./models.router")());
  app.use("/api/services", require("./services.router")());
};
