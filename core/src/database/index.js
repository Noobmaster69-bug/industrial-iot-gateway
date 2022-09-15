const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db.sqlite",
  logging: false,
  // transactionType: "IMMEDIATE",
  // logging: (msg) => console.log(msg),
});
const resync = require("./associate/metadata");
module.exports.sync = async () => {
  try {
    // Configuring dynamic models
    const models = [
      require("./models/services.models"),
      require("./models/protocol.model"),
      require("./models/models.model"),
      require("./models/metadata.model"),
      require("./models/devices.model"),
      require("./models/channels.model"),
      require("./models/APIs.model"),
      require("./models/tasks.model"),
      require("./models/accounts.model"),
      require("./models/configure.model"),
    ];
    for (const model of models) {
      model(sequelize, DataTypes);
    }
    //add associate
    await require("./associate")(sequelize, DataTypes);

    //loading system config
    const fs = require("fs");
    const { Configuration, Accounts } = sequelize.models;
    const defaults = JSON.parse(
      fs.readFileSync(__dirname + "/../../config.json", "utf8")
    );
    const [config, justCreated] = await Configuration.findOrCreate({
      where: { id: 1 },
      defaults,
    });
    const [user, userCreated] = await Accounts.findOrCreate({
      where: { id: 1 },
      defaults: {
        userName: "admin",
        password: "admin",
        role: "admin",
      },
    });
    global._config = config.toJSON();
    if (justCreated) {
      await module.exports.ReloadConfig(sequelize, DataTypes);
    }
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
  if (data.models) {
    for (const model of data.models) {
      await module.exports.Models.create(model);
    }
  }
  if (data.protocols) {
    for (const protocol of data.protocols) {
      await module.exports.Protocol.create(protocol);
    }
  }
  if (data.devices) {
    for (const device of data.devices) {
      await module.exports.Devices.create(device);
    }
  }
  if (data.tasks) {
    for (const task of data.tasks) {
      await module.exports.Tasks.create(task);
    }
  }
};

//Export DAO
module.exports.Services = require("./dao/services")(sequelize);
module.exports.Models = require("./dao/models")(sequelize);
module.exports.Devices = require("./dao/devices.js")(sequelize);
module.exports.Tasks = require("./dao/tasks")(sequelize);
module.exports.Protocol = require("./dao/protocols")(sequelize);
module.exports.Accounts = require("./dao/accounts")(sequelize);
