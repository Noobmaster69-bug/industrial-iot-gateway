const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db.sqlite",
  logging: false,
  // transactionType: "IMMEDIATE",
  logging: (msg) => console.log(msg),
});
const resync = require("./associate/metadata");
module.exports.sync = async () => {
  try {
    // Configuring dynamic models
    const models = [
      require("./models/services.model"),
      require("./models/protocol.model"),
      require("./models/template.model"),
      require("./models/metadata.model"),
      require("./models/devices.model"),
      require("./models/channels.model"),
      require("./models/APIs.model"),
      require("./models/tasks.model"),
      require("./models/accounts.model"),
      require("./models/configure.model"),
    ];
    for (const model of models) {
      model(sequelize, DataTypes, Model);
    }
    //add associate
    await require("./associate")(sequelize, DataTypes);

    //loading system config
    const fs = require("fs");
    const { Configuration, Accounts } = sequelize.models;
    const [config, justCreated] = await Configuration.findOrCreate({
      where: { id: 1 },
      defaults: {
        ...JSON.parse(
          fs.readFileSync(__dirname + "/../../config.json", "utf8")
        ),
        secretOrKey: require("crypto").randomBytes(16).toString("base64"),
      },
    });
    const [{}, {}] = await Accounts.findOrCreate({
      where: { id: 1 },
      defaults: {
        userName: "admin",
        password: "admin",
        role: "admin",
      },
    });
    // global.__config = config.toJSON();
    if (justCreated) {
      await module.exports.ReloadConfig(sequelize, DataTypes);
    }
    return config;
  } catch (err) {
    console.error(err);
  }
};
module.exports.ReloadConfig = async (sequelize, DataTypes) => {
  const fs = require("fs");
  const data = JSON.parse(fs.readFileSync(__dirname + "/../../core.json"));
  if (data.services) {
    for (const service of data.services) {
      await module.exports.Services.create(service);
    }
    await resync(sequelize, DataTypes);
  }
};

//Export DAO
module.exports.Services = require("./dao/services")(sequelize);
module.exports.Template = require("./dao/template")(sequelize);
module.exports.Devices = require("./dao/devices.js")(sequelize);
module.exports.Tasks = require("./dao/tasks")(sequelize);
module.exports.Protocol = require("./dao/protocols")(sequelize);
module.exports.Accounts = require("./dao/accounts")(sequelize);
