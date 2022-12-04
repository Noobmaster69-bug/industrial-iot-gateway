import mqttClient from "mqttClient";
import Transport from "winston-transport";
import { MESSAGE } from "triple-beam";
class MqttTransport extends Transport {
  name: string;
  constructor(options: Transport.TransportStreamOptions) {
    super(options);
    this.name = "mqtt";
  }
  public override log(info: any, next: () => void) {
    const messageAsJson = JSON.parse(info[MESSAGE]);
    if (mqttClient.connected) {
      mqttClient.publish("$CORE/logs", JSON.stringify(messageAsJson));
    }
    next();
  }
}
export default MqttTransport;
