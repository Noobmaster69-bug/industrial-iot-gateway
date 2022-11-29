import mqtt from "mqtt";
import logger from "logger";
const MQTTClient = mqtt.connect({
  host: "localhost",
});

MQTTClient.on("connect", () => {
  logger.info("Connected to mqtt broker");
});
export default MQTTClient;
