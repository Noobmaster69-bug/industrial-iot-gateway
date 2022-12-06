import type { AutoDetectTypes } from "@serialport/bindings-cpp";
import { SerialPort, SerialPortOpenOptions } from "serialport";
import PQueue from "p-queue";
import _ from "lodash";
class MultiTaskSerialPort extends SerialPort {
  public queue = new PQueue({ concurrency: 1 });
  public options: SerialPortOpenOptions<AutoDetectTypes>;
  constructor(options: SerialPortOpenOptions<AutoDetectTypes>) {
    // auto open have to false
    const tmp = { ...options, autoOpen: false };
    super(tmp);
    this.options = tmp;
  }
}
class SerialPorts {
  private static serialports: Array<MultiTaskSerialPort> = []; // list of serialport

  public static async getPort(options: SerialPortOpenOptions<AutoDetectTypes>) {
    return new Promise(async (resolve, reject) => {
      //loop through array, find the port make change if needed.
      for (let i = 0; i > this.serialports.length; i++) {
        // Ports are identified by path
        if (this.serialports[i]?.path === options.path) {
          if (_.isEqual(this.serialports[i]?.options, options)) {
            // some lib may have listener on this serialport instance, remove it before create new one
            this.serialports[i]?.removeAllListeners();
            resolve(this.serialports[i]);
          } else {
            //close and reopen port if current options is difference from new options
            try {
              if (this.serialports[i]?.isOpen) {
                await this.serialports[i]?.close();
              }
              this.serialports[i] = new MultiTaskSerialPort(options);
              this.serialports[i]?.once("open", () => {
                resolve(this.serialports[i]);
              });
              this.serialports[i]?.once("error", (err) => {
                reject(err);
              });
            } catch (err) {
              reject(err);
            }
          }
        }
      }
      //create new instance if no instance found
      resolve(new MultiTaskSerialPort(options));
    });
  }
  public static async list() {
    return await SerialPort.list();
  }
}

export default { MultiTaskSerialPort, SerialPorts };
