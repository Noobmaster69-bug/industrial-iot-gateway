module.exports.get = async function (req, res) {
  const {
    id,
    path = undefined,
    baudRate = undefined,
    slaveID = undefined,
    stopBits = 1,
    dataBits = 8,
    channels = undefined,
    parity = "none",
    ...others
  } = req.body;
  if ((path && baudRate && slaveID) === undefined)
    return res.status(400).send("Please check request parameter");
  if (!Array.isArray(channels))
    return res.status(400).send("channels must be array");
  const { ModbusRTU } = require("../modbus");
  const rtuClient = ModbusRTU;
  try {
    const Coils = [];
    const DiscreteInputs = [];
    const HoldingRegister = await rtuClient.readHoldingRegisterChannels(
      {
        path,
        baudRate,
        slaveID,
        stopBits,
        dataBits,
        parity,
      },
      channels.filter((e) => e.fc === "03")
    );
    const InputRegisters = [];
    //Coil, ,...
    const data = [
      ...Coils,
      ...DiscreteInputs,
      ...HoldingRegister,
      ...InputRegisters,
    ];
    res.send({ ...others, channels: data });
  } catch (err) {
    const { code = 400, message = "" } = err;
    console.err(err);
    res.status(code).send(message);
  }
};
module.exports.getSerialPort = async function (req, res) {
  const { ModbusRTU } = require("../modbus");
  try {
    res.send(await ModbusRTU.SerialPort());
  } catch (err) {
    res.send(err);
  }
};
