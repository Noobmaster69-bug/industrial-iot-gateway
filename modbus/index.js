const app = require("express")();
(async function () {
  require("./src/middleware/middleware.js")(app);
  require("./src/routes/index.js")(app);
  await require("./src/modbus").ModbusRTU.SerialPort();
  app.use("/status", (req, res) => {
    return res.sendStatus(200);
  });
  app.use("/*", (req, res) => res.sendStatus(500));
  app.listen(33334, () => {
    console.log(`ds-modbus is running on ${33334}`);
  });
})();
