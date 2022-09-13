/**
 * Hash option to generate id
 * @param {*} option
 */
function hashOption(option) {
  const crypto = require("crypto");
  return crypto.createHash("md5").update(option).digest("hex");
}
function sortObject(unordered) {
  return (ordered = Object.keys(unordered)
    .sort()
    .reduce((obj, key) => {
      obj[key] = unordered[key];
      return obj;
    }, {}));
}

const EventEmitter = require("events");

/**
 * @class {MQTTClient} New MQTTClient class base on Event Driven
 */
class MQTTClient extends EventEmitter {
  option = {};
  #client;

  /**
   * @constructs MQTTClient
   * @param {Object} option
   * @param {number} option.id protocol user define id, these id must be unique or program will be crashed
   * @param {string} option.host host ip or domain name
   * @param {"mqtt" | "mqtts"} option.protocol
   */
  constructor(option) {
    super();
    const mqtt = require("./library");
    const NeDBStore = require("mqtt-nedb-store");

    const { host, protocol = "mqtt", ...others } = option;

    //store option

    this.option = sortObject(option);
    this.id = hashOption(JSON.stringify(this.option));
    //create mqtt connection
    let client;
    const manager = NeDBStore(`./store/${this.id}`);
    client = mqtt.connect(`${protocol}://${host}`, {
      ...others,
      outgoingStore: manager.outgoing,
      incomingStore: manager.incoming,
    });

    //store client
    this.#client = client;
    client.on("connect", () => {
      console.log("connected to broker " + `${protocol}://${host}`);
    });
    client.on("error", () => {
      console.log("err");
    });
    client.on("close", () => {
      console.log("close");
    });
    client.on("disconnect", () => {
      console.log("disconnect to broker " + `${protocol}://${host}`);
    });
    // when a message arrived
    client.on("message", (topic, message) => {
      const mqttWildcard = require("mqtt-wildcard");

      //list current event names
      const events = this.eventNames();

      let isMatched = false;

      // trigger all listeners of topic which are matched with current topic
      for (const event of events) {
        //check mqtt wildcard, if match, matcher will be an array
        const matcher = mqttWildcard(topic, event);

        if (Array.isArray(matcher)) {
          this.emit(event, topic, message);
          isMatched = true;
        }
      }
      //unsubcribe if topic dont have listener
      if (!isMatched) {
        this.unsub(topic);
      }
    });
  }

  /**
   * publish to a topic
   * @param {string | string[]} topic
   * @param {string | buffer} message
   * @returns
   */
  async pub(topic, message) {
    return await new Promise(async (reslove, reject) => {
      this.#client.publish(topic, message, { qos: 2 }, (err) => {
        if (err) {
          reject(err);
        } else {
          reslove();
        }
      });
    });
  }

  /**
   * subscribe to a topic
   * @param {string | string[]} topic
   * @param {function(topic, message)} listener call back function which will trigger when message of the topic arrive
   * @returns
   */
  async sub(topic, listener) {
    return await new Promise((resolve, reject) => {
      this.#client.subscribe(topic, {}, (err, granted) => {
        if (err) {
          reject(err);
        } else {
          this.on(topic, listener);
          resolve();
        }
      });
    });
  }

  /**
   * subscribe once to topic, after a message arrive, unsub this topic
   * @param {string | string[]} topic
   * @param {function(message)} listener
   * @returns
   */
  async subOnce(topic, listener) {
    return await new Promise((resolve, reject) => {
      if (this.#client.connected) {
        this.#client.subscribe(topic, {}, (err, granted) => {
          if (err) {
            reject(err);
          } else {
            this.once(topic, listener);
            resolve();
          }
        });
      } else {
        this.#client.once("connect", () => {
          this.#client.subscribe(topic, {}, (err, granted) => {
            if (err) {
              reject(err);
            } else {
              this.once(topic, listener);
              resolve();
            }
          });
        });
      }
    });
  }
  /**
   * publish to an topic and wait for responce
   * @param {string | string[]} upTopic
   * @param {string | string[]} downTopic
   * @param {string | Buffer} message
   * @param {number} timeOut time to wait for responce
   */
  async pubSync(upTopic, downTopic, message, timeOut = 5000) {
    return await new Promise(async (resolve, reject) => {
      let timer = setTimeout(() => {
        reject("Timeout");
      }, timeOut);
      await this.subOnce(downTopic, (topic, message) => {
        clearTimeout(timer);
        resolve(message);
      });
      await this.pub(upTopic, message);
    });
  }

  /**
   * unsub a topic
   * @param {string | string[]} topic
   *
   */
  async unsub(topic) {
    await new Promise((resolve, reject) => {
      this.#client.unsubscribe(topic, (err) => {
        if (err) {
          reject(err);
        } else {
          this.removeAllListeners(topic);
          resolve();
        }
      });
    });
  }
}

/**
 * MQTT class provide methods to manage MQTTClient(s)
 */
class MQTT {
  /**
   * clients: [MQTTClient]
   */
  #clients = [];

  /**
   * publish to broker
   * @param {Object} option
   * @param {number} option.id protocol user define id, these id must be unique or program will be crashed
   * @param {string} option.host host ip or domain name
   * @param {"mqtt" | "mqtts"} option.protocol
   *
   * @param {string} topic
   *
   * @param {string} message
   */
  async publish(option, topic, message) {
    try {
      const client = await this.#getClient(option);
      await client.pub(topic, message);
    } catch (err) {
      throw err;
    }
  }

  /**
   * subscribe to a topic
   * @param {Object} option
   * @param {number} option.id protocol user define id, these id must be unique or program will be crashed
   * @param {string} option.host host ip or domain name
   * @param {"mqtt" | "mqtts"} option.protocol
   *
   * @param {string} topic
   *
   * @param {function(topic,message)} listener topic message handler
   *
   */
  async subscribe(option, topic, listener) {
    try {
      const client = await this.#getClient(option);
      await client.sub(topic, listener);
    } catch (err) {
      throw err;
    }
  }

  /**
   *
   * @param {Object} option
   * @param {number} option.id protocol user define id, these id must be unique or program will be crashed
   * @param {string} option.host host ip or domain name
   * @param {"mqtt" | "mqtts"} option.protocol
   *
   * @param {string} topic
   */
  async unsubscribe(option, topic) {
    try {
      const client = await this.#getClient(option);
      await client.unsub(topic);
    } catch (err) {
      throw err;
    }
  }

  /**
   * publish to a topic and wait for responce
   * @param {Object} option
   * @param {number} option.id protocol user define id, these id must be unique or program will be crashed
   * @param {string} option.host host ip or domain name
   *
   * @param {string} upTopic
   * @param {string} downTopic
   * @param {string} message
   * @param {number} [timeOut=5000]
   * @returns
   */
  async pubSync(option, upTopic, downTopic, message, timeOut = 5000) {
    try {
      const client = await this.#getClient(option);
      return await client.pubSync(upTopic, downTopic, message, timeOut);
    } catch (err) {
      throw err;
    }
  }

  /**
   * find client which being managed
   * @param {Object} option
   * @param {number} option.id protocol user define id, these id must be unique or program will be crashed
   * @param {string} option.host host ip or domain name
   *
   * @returns {MQTTClient}
   */
  #queryClient(option) {
    const _ = require("lodash");
    //find client by id
    const id = hashOption(JSON.stringify(sortObject(option)));
    const client = this.#clients.find((cl) => cl.id === id);
    //compare to client option
    return client;
  }

  /**
   * create new client
   * @param {Object} option
   * @param {number} option.id protocol user define id, these id must be unique or program will be crashed
   * @param {string} option.host host ip or domain name
   *
   * @returns {MQTTClient}
   */
  async #newClient(option) {
    const client = new MQTTClient(option);
    this.#clients.push(client);
    return client;
  }

  /**
   * create new client
   * @param {Object} option
   * @param {number} option.id protocol user define id, these id must be unique or program will be crashed
   * @param {string} option.host host ip or domain name
   *
   * @returns {MQTTClient}
   */
  async #getClient(option) {
    try {
      let client = this.#queryClient(option);
      if (client === undefined) {
        client = await this.#newClient(option);
      }
      return client;
    } catch (err) {
      throw err;
    }
  }
}
module.exports = new MQTT();
