module.exports = function (app, express) {
  app.use("/devices", require("./devices.router")());
  app.use("/models", require("./models.router")());
};
