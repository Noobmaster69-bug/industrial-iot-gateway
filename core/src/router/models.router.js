module.exports = function () {
  const Router = require("express").Router();
  Router.get("/", async (req, res) => {
    try {
      const { Models } = require("../database");
      const devices = await Models.getAll("defaults");
      res.send(devices);
    } catch (err) {
      console.error(err);
      res.sendStatus(400);
    }
  });
  Router.get("/:mode", async (req, res) => {
    const { mode } = req.params;
    try {
      const { Models } = require("../database");
      const devices = await Models.getAll(mode);
      res.send(devices);
    } catch (err) {
      console.error(err);
      res.sendStatus(400);
    }
  });
  Router.delete("/", async (req, res) => {
    try {
      const { id } = req.query;
      const { Devices } = require("../database");
      await Devices.delete(id);
      res.sendStatus(200);
    } catch (err) {
      console.error(err);
      res.sendStatus(400);
    }
  });
  return Router;
};
