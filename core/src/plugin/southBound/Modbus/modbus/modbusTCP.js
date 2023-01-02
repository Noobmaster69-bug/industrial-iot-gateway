import net from "net";
import _ from "lodash";
class Socket {
  socket;
  option = {};
  constructor(option) {
    this.socket = new net.Socket();
    this.socket.connect(option);
    this.socket.on("error", (err) => {
      console.log(err);
    });
    this.option = option;
  }
}
class modbusTCP {
  #sockets = [];
  #querySocket(option) {
    return this.#sockets.find((socket) => _.isEqual(socket.option, option));
  }
  #addnewSocket(option) {
    this.#sockets.push(new Socket(option));
  }
  async modbusClient(option, register) {
    const { slaveID } = register;
    const socket = this.#querySocket(option) || this.#addnewSocket(option);
  }
}
export default modbusTCP;
