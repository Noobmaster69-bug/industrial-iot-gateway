import Transport from "winston-transport";
import { MESSAGE } from "triple-beam";
import io from "socket";
class SocketTransport extends Transport {
  name: string;
  constructor(options: Transport.TransportStreamOptions) {
    super(options);
    this.name = "mqtt";
  }
  public override log(info: any, next: () => void) {
    io?.to("logs").emit(info[MESSAGE]);
    next();
  }
}
export default SocketTransport;
