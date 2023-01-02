import { SerialPort } from "serialport";
import { ModbusChannels, ModbusProtocols } from "./modbus.models";
import { modbusRTU } from "./modbus/index";
class ModbusPlugin {
  public static async get(
    _protocol: ModbusProtocols,
    _channels: ModbusChannels
  ) {
    // const { data } = await axios.get("http://localhost:33334/RTU", {
    //   data: { ..._protocol, channels: _channels },
    // });
    const test = await modbusRTU.readHoldingRegisterChannels(
      _protocol,
      _channels
    );
    console.log(test);
    return test;
  }
  public static async set(
    _protocol: ModbusProtocols,
    _channels: Array<ModbusChannels>
  ) {
    return await Promise.reject("No set method for this plugin");
  }
  public static async getProperties() {
    return await Promise.resolve({
      name: "modbus",
      channels: {
        addr: {
          type: "INTEGER",
          label: "Address",
        },
        fc: {
          type: "ENUM",
          label: "Function code",
          values: ["03"],
        },
        dataType: {
          type: "ENUM",
          values: [
            "BigInt64BE",
            "BigInt64LE",
            "BigUInt64BE",
            "BigUInt64BE",
            "BigUInt64LE",
            "DoubleBE",
            "DoubleLE",
            "FloatBE",
            "FloatLE",
            "Int32BE",
            "Int32LE",
            "UInt32BE",
            "UInt32LE",
            "Int16BE",
            "Int16LE",
            "UInt16BE",
            "UInt16LE",
          ],
          defaultValue: "Int16BE",
          label: "Data Type",
        },
      },
      protocols: {
        path: {
          type: "ENUM",
          values: (await SerialPort.list()).map(({ path }) => path),
        },
        baudRate: {
          type: "INTEGER",
          allowNull: false,
        },
        slaveID: {
          type: "INTEGER",
        },
        parity: {
          type: "ENUM",
          values: ["none", "odd", "even"],
        },
      },
      Channels: ModbusChannels,
      Protocols: ModbusProtocols,
      plugin: ModbusPlugin,
    });
  }
}
export default ModbusPlugin;
