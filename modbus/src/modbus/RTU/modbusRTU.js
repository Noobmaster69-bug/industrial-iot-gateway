class serialport {
  #path;
  #currentOption = {};
  #serialport = {
    isOpen: false,
  };
  /**
   *
   * @param {string} path
   */
  constructor(path) {
    this.#path = path;
  }

  config(option) {
    return new Promise(async (resolve, reject) => {
      const _ = require("lodash");
      try {
        if (!_.isEqual(option, this.#currentOption)) {
          if (this.#serialport.isOpen) {
            await this.#serialport.close();
          }
          const { SerialPort } = require("serialport");
          this.#serialport = new SerialPort({ path: this.#path, ...option });
          this.#currentOption = option;
          this.#serialport.on("open", () => {
            this.#serialport.removeAllListeners();
            resolve(this.#serialport);
          });
          this.#serialport.on("error", (err) => {
            this.#serialport.removeAllListeners();
            reject(err);
          });
        } else {
          this.#serialport.removeAllListeners();
          resolve(this.#serialport);
        }
      } catch (err) {
        this.#serialport.removeAllListeners();
        reject(err);
      }
    });
  }
  getPath() {
    return this.#path;
  }
}
/*
Provide some basic modbus interface function and manage serialports connection
Each serial port have it own queue to avoid conflict
*/
class modbusRTU {
  /*
  serialport = {
    queue,
    SerialPort
  }
  */
  #serialports = [];

  #fcs = {
    "01": "readCoils",
    "02": "readDiscreteInputs",
    "03": "readHoldingRegisters",
    "04": "readInputRegisters",
    "05": "writeSingleCoil",
    "06": "writeSingleRegister",
    "0F": "writeMultipleCoils",
    10: "writeMultipleRegisters",
  };

  async readCoils(option, register) {
    return this.command("01", option, register);
  }
  async readDiscreteInput(option, register) {
    return this.command("02", option, register);
  }
  /**
   *
   * @param {RTUOption} option
   * @param {register} register
   * @returns
   */
  async readHoldingRegisters(option, register) {
    return this.command("03", option, register);
  }
  async readInputRegisters(option, register) {
    return this.command("04", option, register);
  }

  async writeSingleCoil(option, register) {
    return this.command("05", option, register);
  }
  async writeSingleRegister(option, register) {
    return this.command("06", option, register);
  }
  async writeMultipleCoils(option, register) {
    return this.command("0F", option, register);
  }
  async writeMultipleRegisters(option, register) {
    return this.command("10", option, register);
  }
  async command(fc, option, register) {
    const { path } = option;
    const { queue } = this.#queryPort(path) || this.#addnewPort(path);
    const temp = await queue.add(
      () =>
        new Promise(async (resolve, reject) => {
          try {
            const client = await this.#modbusClient(option, register);
            const { addr, quantity } = register;

            const result = await client[this.#fcs[fc]](addr, quantity);
            resolve(result);
          } catch (err) {
            switch (err.message) {
              case `Error: Permission denied, cannot open ${path}`:
                reject({
                  code: 503,
                  message:
                    "Permission denied, run sudo chmod 666 " +
                    path +
                    ". For more detail, please search about how to gain serialport permission on linux",
                });
              default:
                reject(err);
            }
          }
        })
    );
    return temp;
  }
  #queryPort(path) {
    return this.#serialports.find((serialport) => {
      return serialport?.SerialPort?.getPath() === path;
    });
  }
  #addnewPort(path) {
    const PQueue = require("p-queue");
    const temp = {
      SerialPort: new serialport(path),
      queue: new PQueue({ concurrency: 1 }),
    };
    this.#serialports.push(temp);
    return temp;
  }
  async #modbusClient(option) {
    try {
      const {
        path,
        baudRate = 9600,
        parity = "none",
        stopBits = 1,
        dataBits = 8,
        slaveID,
        timeout = 100,
      } = option;
      const { SerialPort } = this.#queryPort(path) || this.#addnewPort(path);
      const port = await SerialPort.config({
        baudRate,
        parity,
        stopBits,
        dataBits,
      });

      const Modbus = require("jsmodbus");
      const client = new Modbus.client.RTU(port, slaveID, timeout);
      return client;
    } catch (err) {
      throw err;
    }
  }
}
module.exports = modbusRTU;
