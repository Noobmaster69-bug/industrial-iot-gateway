/**
 * @class Modbus
 */
class Modbus {
  #client;

  /**
   * class constructor
   * @constructor {"RTU"|"TCP"} type
   */
  constructor(type) {
    const modbusRTU = require("./RTU/modbusRTU");
    const modbusTCP = require("./modbusTCP");
    if (type === "RTU") this.#client = new modbusRTU();
  }

  /**
   * readHoldingRegister
   * @param {ModbusOption} option
   * @param {ModbusChannel} channels
   * @returns {Promise<channels>}
   */
  async readHoldingRegisterChannels(option, channels) {
    const ConsecutivesArray = this.#getConsecutiveRegister(channels);

    const result = ConsecutivesArray.map(async (ConsecutivesGroup) => {
      return new Promise(async (resolve, reject) => {
        const lastReg = ConsecutivesGroup[ConsecutivesGroup.length - 1];
        const firstReg = ConsecutivesGroup[0];

        const quantity =
          lastReg.addr -
          firstReg.addr +
          this.#getByteQuantity(lastReg.dataType);
        try {
          const resultAsObject = await this.#client.readHoldingRegisters(
            option,
            {
              addr: firstReg.addr,
              quantity,
            }
          );
          const resultAsBuffer = resultAsObject.response._body._valuesAsBuffer;
          const resultAsArray = ConsecutivesGroup.map((channel) => {
            const { addr, dataType, fc, ...others } = channel;
            const data = resultAsBuffer[`read${channel.dataType}`](
              (channel.addr - firstReg.addr) * 2
            );
            return { ...others, value: data };
          }).flat();
          resolve(resultAsArray);
        } catch (err) {
          reject(err);
        }
      });
    });
    try {
      return (await Promise.all(result)).flat();
    } catch (err) {
      this.#errorParser(err);
    }
  }
  #errorParser(err) {
    switch (err.message) {
      case "A Modbus Exception Occurred - See Response Body":
        let ErrorName;
        switch (err.response._body._code) {
          case 1:
            ErrorName = "Illegal Function";
            break;
          case 2:
            ErrorName = "Illegal Data Address";
            break;
          case 3:
            ErrorName = "Illegal Data Value";
            break;
          case 4:
            ErrorName = "Slave Device Failure";
            break;
          case 5:
            ErrorName = "Acknowledge";
            break;
          case 6:
            ErrorName = "Slave Device Busy";
            break;
          case 7:
            ErrorName = "Negative Acknowledge";
            break;
          case 8:
            ErrorName = "Memory Parity Error";
            break;
          case 10:
            ErrorName = "Gateway Path Unavailable";
            break;
          case 11:
            ErrorName = "Gateway Target Device Failed to Respond";
            break;
        }
        throw { code: 400, message: ErrorName };
      case "Req timed out":
        throw { code: 408, message: "Device has disconnected" };
      case "no connection to modbus server":
        throw { code: 400, message: "No Connection to modbus Server" };
      default:
        throw err;
    }
  }
  /**
   *
   * @param {modbusChannels} channels
   */
  #getConsecutiveRegister(channels = []) {
    const sortedChannels = channels.sort((a, b) => a.addr - b.addr);
    const MaxConsecutives = sortedChannels.reduce(
      (a, b, i) => {
        if (i === 0) {
          if (sortedChannels.length - 1 === i) {
            return [...a, 0];
          }
          return a;
        }
        if (
          sortedChannels[i].addr - sortedChannels[i - 1].addr <=
          this.#getByteQuantity(sortedChannels[i - 1].dataType)
        ) {
          if (i === sortedChannels.length - 1) {
            return [...a, i];
          }
          return a;
        } else {
          if (i === sortedChannels.length - 1) {
            return [...a, i - 1, i];
          }
          return [...a, i - 1];
        }
      },
      [-1]
    );
    let ConsecutivesArray = MaxConsecutives.reduce((a, b, i, arr) => {
      if (i === 0) return a;
      return [
        ...a,
        sortedChannels.filter(
          (channel, index) => index <= arr[i] && index >= arr[i - 1] + 1
        ),
      ];
    }, []);
    ConsecutivesArray = ConsecutivesArray.reduce((rtValue, element, index) => {
      const maximumWindow = 125;
      const window = element[element.length - 1].addr - element[0].addr;
      if (maximumWindow > window) return [...rtValue, element];
      let returnArray = [...Array(Math.ceil(window / maximumWindow))].map(
        (e, currentWindow) =>
          element.filter(
            (e, i) =>
              i < (currentWindow + 1) * maximumWindow &&
              i >= currentWindow * maximumWindow
          )
      );
      return [...rtValue, ...returnArray];
    }, []);
    return ConsecutivesArray;
  }
  /**
   *
   * @param {dataTypes} type
   */
  #getByteQuantity(dataType) {
    switch (dataType) {
      case "BigInt64BE":
      case "BigInt64LE":
      case "BigUInt64BE":
      case "BigUInt64LE":
      case "DoubleBE":
      case "DoubleLE":
        return 4;
      case "FloatBE":
      case "FloatLE":
      case "Int32BE":
      case "Int32LE":
      case "UInt32BE":
      case "UInt32LE":
        return 2;
      case "Int16BE":
      case "Int16LE":
      case "UInt16BE":
      case "UInt16LE":
      default:
        return 1;
    }
  }
}
/**
 * @class ModbusRTU
 */
class ModbusRTU extends Modbus {
  constructor() {
    super("RTU");
  }
  async readHoldingRegisterChannels(option, channels) {
    try {
      return super.readHoldingRegisterChannels(option, channels);
    } catch (err) {
      throw err;
    }
  }
  async SerialPort() {
    const { SerialPort } = require("serialport");
    return await SerialPort.list();
  }
}
module.exports.ModbusRTU = new ModbusRTU();
