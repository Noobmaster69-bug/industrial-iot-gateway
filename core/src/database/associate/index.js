module.exports = async (sequelize, DataTypes) => {
  require("./services.js")(sequelize);
  require("./devices.js")(sequelize);
  require("./task.js")(sequelize);
  for (const model of Object.values(sequelize.models)) {
    await model.sync();
  }
  await require("./metadata")(sequelize, DataTypes);
};
