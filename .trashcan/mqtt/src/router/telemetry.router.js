module.exports = function () {
  const Router = require("express").Router();
  const { telemetry } = require("../controller");
  Router.post("/", telemetry.post);
  //   Router.get("/", models.get);
  //   Router.delete("/", models.delete);
  return Router;
};
