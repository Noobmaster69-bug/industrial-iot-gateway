module.exports = function () {
  const Router = require("express").Router();
  Router.get("/count", async (req, res) => {
    const { Devices } = require("../database");
    try {
      const count = await Devices.count();
      res.send({ count });
    } catch (err) {
      console.error(err);
      res.sendStatus(400);
    }
  });
  Router.post("/", async (req, res) => {
    const { Devices } = require("../database");
    const { body } = req;
    try {
      await Devices.create(body);
      res.sendStatus(201);
    } catch (err) {
      console.error(err);
      res.sendStatus(400);
    }
  });
  Router.get("/all", async (req, res) => {
    try {
      const { Devices } = require("../database");
      const devices = await Devices.getAll("all");
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
