const fcs = {
  "01": "readCoils",
  "02": "readDiscreteInputs",
  "03": "readHoldingRegisters",
  "04": "readInputRegisters",
  "05": "writeSingleCoil",
  "06": "writeSingleRegister",
  "0F": "writeMultipleCoils",
  10: "writeMultipleRegisters",
};

interface Modbus {
  readCoils: () => Promise<number>;
  readDiscreteInput: () => Promise<number>;
  // readHoldingRegisters
  // readInputRegisters

  //   writeSingleCoil
  //   writeSingleRegister
  //   writeMultipleCoils
  //   writeMultipleRegisters
  //   command
}
