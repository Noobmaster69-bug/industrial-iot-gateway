module.exports.post = async function (req, res) {
  try {
    const {
      data: {
        data: { channels },
        config: { topic, ...config },
        token,
      },
    } = req.body;
    let packet = {
      deviceId: token,
    };
    packet = channels.reduce((a, b) => {
      return { ...a, [b.name]: b.value };
    }, packet);
    const mqtt = require("../mqtt");
    await mqtt.publish(
      config,
      "up/telemetry/" + topic,
      JSON.stringify([packet])
    );
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};
