module.exports = function (app) {
  app.use("/telemetry", require("./telemetry.router")());
  app.use("/provision", require("./provision.router")());
};
