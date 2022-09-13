module.exports = function () {
  const Router = require("express").Router();
  const { provision } = require("../controller");
  Router.post("/", provision.post);
  //   Router.get("/", models.get);
  //   Router.delete("/", models.delete);
  return Router;
};
