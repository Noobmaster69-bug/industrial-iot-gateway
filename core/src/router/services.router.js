module.exports = function () {
  const Router = require("express").Router();
  Router.get("/down", async (req, res) => {
    const { Services } = require("../database");
    try {
      const result = await Services.getDeviceProtocol();
      res.send(result);
    } catch (err) {
      console.error(err);
      res.sendStatus(400);
    }
  });

  Router.get("/all", async (req, res) => {
    const { Services } = require("../database");
    try {
      const result = await Services.getAll();
      res.send(result);
    } catch (err) {
      console.error(err);
      res.sendStatus(400);
    }
  });
  Router.get("/", async (req, res) => {
    const { id } = req.query;
    const { Services } = require("../database");
    try {
      const result = await Services.getById(id);
      res.send(result);
    } catch (err) {
      console.error(err);
      res.sendStatus(400);
    }
  });
  // Router.post("/", async (req, res) => {
  //   const { Devices } = require("../database");
  //   const { body } = req;
  //   try {
  //     await Devices.create(body);
  //     res.sendStatus(201);
  //   } catch (err) {
  //     console.error(err);
  //     res.sendStatus(400);
  //   }
  // });
  // Router.get("/:mode", async (req, res) => {
  //   const { mode } = req.params;
  //   try {
  //     const { Devices } = require("../database");
  //     const devices = await Devices.getAll(mode);
  //     res.send(devices);
  //   } catch (err) {
  //     console.error(err);
  //     res.sendStatus(400);
  //   }
  // });
  // Router.delete("/", async (req, res) => {
  //   try {
  //     const { id } = req.query;
  //     const { Devices } = require("../database");
  //     await Devices.delete(id);
  //     res.sendStatus(200);
  //   } catch (err) {
  //     console.error(err);
  //     res.sendStatus(400);
  //   }
  // });
  return Router;
};
