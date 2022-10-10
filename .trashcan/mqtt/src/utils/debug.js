module.exports = function (type) {
  const DEBUG = require("debug");
  const debug = DEBUG("ds-mqtt");
  debug.log = console.log.bind(console);
  DEBUG.enable("ds-mqtt*");
  return debug.extend(type);
};
