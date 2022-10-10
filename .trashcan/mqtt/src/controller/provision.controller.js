module.exports.post = async function (req, res) {
  const { name, channels, topic, ...option } = req.body.data;
  const mqtt = require("../mqtt");
  let packet = {
    name: {
      type: "string",
      value: name,
    },
  };
  packet = channels.reduce((a, b) => {
    return {
      ...a,
      [b.name]: {
        type: "number",
      },
    };
  }, packet);
  try {
    const provision = await mqtt.pubSync(
      option,
      `up/provision/${topic}`,
      `down/provision/${topic}`,
      JSON.stringify([packet]),
      10000
    );

    res.send(JSON.parse(provision));
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};
