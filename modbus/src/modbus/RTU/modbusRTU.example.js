const modbusRTU = require("./modbusRTU");
const instance = new modbusRTU();
/*calling readHoldingRegisters twice, you can see queue is working */
instance
  .readHoldingRegisters(
    {
      path: "/dev/ttyUSB0",
      baudRate: 115200,
      slaveID: 1,
    },
    { addr: 1, quantity: 1 }
  )
  .then((e) => {
    const {
      metrics: { startedAt, receivedAt },
    } = e;
    console.log(e);
    console.log(new Date(receivedAt) - new Date(startedAt));
  })
  .catch(console.log);
instance
  .readHoldingRegisters(
    {
      path: "/dev/ttyUSB0",
      baudRate: 115200,
      slaveID: 1,
    },
    { addr: 1, quantity: 63 }
  )
  .then((e) => {
    const {
      metrics: { startedAt, receivedAt },
    } = e;
    console.log(new Date(receivedAt) - new Date(startedAt));
  })
  .catch(console.log);
