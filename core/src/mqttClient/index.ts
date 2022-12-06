import mqtt from "mqtt";
import logger from "logger";
import crypto from "crypto";
const clientId = crypto.randomBytes(16).toString("hex");
const mqttClient = mqtt.connect({
  clientId: clientId,
  host: "localhost",
});
mqttClient.on("connect", () => {
  logger.info("mqtt-local: connected to local mqtt broker");
});
mqttClient.on("offline", () => {
  logger.warn("mqtt-local: cannot connect to local mqtt broker");
});
mqttClient.on("error", (error) => {
  logger.error("mqtt-local:" + error);
});
mqttClient.on("disconnect", () => {
  logger.warn("mqtt-local: disconnected to local mqtt broker");
});
export default mqttClient;
export { clientId };
