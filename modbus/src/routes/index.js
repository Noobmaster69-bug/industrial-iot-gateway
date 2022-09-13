module.exports = function (app) {
  //RTU
  const { RTU } = require("../controller");
  app.get("/RTU/SerialPort", RTU.getSerialPort);
  app.get("/RTU", RTU.get);
};
