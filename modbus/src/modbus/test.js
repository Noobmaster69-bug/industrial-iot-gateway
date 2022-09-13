const Modbus = require("./index.js");
const client = new Modbus("RTU");

client
  .readHoldingRegisterChannels(
    { path: "/dev/ttyUSB0", baudRate: 115200, slaveID: 1 },
    [
      { name: "voltage", addr: 1, dataType: "FloatBE" },
      { name: "current", addr: 2, dataType: "Int16BE" },
      { name: "voltage", addr: 3, dataType: "Int16BE" },
      { name: "current", addr: 4, dataType: "Int16BE" },
    ]
  )
  .then(console.log)
  .catch(console.log);
