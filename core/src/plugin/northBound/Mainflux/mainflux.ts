import mqtt from "mqtt";
import _ from "lodash";
import logger from "logger";
import { Channels, Devices, Protocols } from "devices";
import { southBound } from "plugin";
import pluralize from "pluralize";
import { MainfluxProtocol } from "./mainflux.models";
namespace NMainflux {
  export interface ConstructorOpts {
    thingKey: string;
    thingId: string;
    channelId: string;
    host: string;
    protocol: "mqtt" | "mqtts";
  }
}

class Mainflux {
  //instance methods
  client: mqtt.MqttClient;
  opts: NMainflux.ConstructorOpts;
  constructor(_otps: NMainflux.ConstructorOpts) {
    this.client = mqtt.connect({
      username: _otps.thingId,
      password: _otps.thingKey,
      host: _otps.host,
      port: _otps.protocol === "mqtts" ? 8883 : 1883,
      protocolVersion: 4,
      protocol: _otps.protocol,
      rejectUnauthorized: true,
    });
    console.log({
      username: _otps.thingId,
      password: _otps.thingKey,
      host: _otps.host,
      port: _otps.protocol === "mqtts" ? 8883 : 1883,
      protocolVersion: 4,
      protocol: _otps.protocol,
      rejectUnauthorized: true,
    });
    this.client.on("error", (err) => {
      logger.error(err.message);
    });
    this.client.on("connect", () => {
      logger.info("connected to mainflux");
      this.client.subscribe(`channels/${this.opts.channelId}/messages/command`);
      this.client.on("message", async (_topic, message) => {
        const messageJSON = JSON.parse(message.toString());
        if (!_.isArray(messageJSON)) {
          logger.warn("command message has wrong format: " + messageJSON);
          return;
        }
        //check bn
        const bn = messageJSON[0].bn;
        if (!bn) {
          logger.warn("bn not exist");
          return;
        }
        const device_key = bn.split(":")[3];
        if (!device_key) {
          logger.warn("device id not exist");
          return;
        }
        const device = await Devices.findOne({
          where: { deviceKey: device_key },
          include: {
            model: Protocols,
            as: "downProtocol",
          },
        });
        if (!device) {
          logger.warn("device not exist");
          return;
        }
        const names = messageJSON.map((message: { n: string }) => message.n);
        const downPlugin = await southBound.getPlugin(
          device.downProtocol.plugin
        );
        if (downPlugin) {
          const channels = (
            await Channels.findAll({
              where: {
                plugin: device.downProtocol.plugin,
                name: names,
                DeviceId: device.id,
              },
              include: [downPlugin?.Channels],
            })
          ).map((channel) => {
            let result = channel.toJSON();
            result = {
              ...result,
              ...result[
                pluralize.singular(downPlugin?.Channels.getTableName() + "")
              ],
            };
            delete result[
              pluralize.singular(downPlugin?.Channels.getTableName() + "")
            ];
            result.value = messageJSON.find(
              (message: { n: string }) => message.n === result.name
            ).v;
            return result;
          });
          //@ts-ignore
          const downProtocol = await downPlugin?.Protocols.findOne({
            where: {
              ProtocolId: device.downProtocol.id,
            },
          });
          try {
            if (downProtocol && channels) {
              //@ts-ignore
              await downPlugin?.plugin.set(downProtocol, channels);
            }
          } catch (err) {}
        }
      });
    });
    this.opts = _otps;
  }

  static connections: Array<Mainflux> = [];

  static addConnection(_otps: NMainflux.ConstructorOpts) {
    const { thingKey, thingId, channelId, host, protocol } = _otps;
    let instance = this.findConnection({
      thingKey,
      thingId,
      channelId,
      host,
      protocol,
    });
    // create new connection if instance not exists
    if (!instance) {
      instance = new Mainflux({
        thingKey,
        thingId,
        channelId,
        host,
        protocol,
      });
      this.connections.push(instance);
    }
    return instance;
  }

  private static findConnection(_otps: NMainflux.ConstructorOpts) {
    return this.connections.find((connection) =>
      _.isEqual(connection.opts, _otps)
    );
  }

  static async reload() {
    const connections = await MainfluxProtocol.findAll();
    for (const connection of connections) {
      Mainflux.addConnection(connection.toJSON());
    }
  }

  static publish(opts: NMainflux.ConstructorOpts, message: any) {
    const { thingKey, thingId, channelId, host, protocol } = opts;

    const instance = this.connections.find((connection) =>
      _.isEqual(connection.opts, {
        thingKey,
        thingId,
        channelId,
        host,
        protocol,
      })
    );
    instance?.client.publish(
      `channels/${instance.opts.channelId}/messages/data`,
      JSON.stringify(message),
      {
        qos: 2,
      }
    );
  }
}

export default Mainflux;
