/**
 * @module logger require this file to your project to attach timestamp to your console.log/error and export log to file
 */

const fs = require("fs");
const chalk = require("chalk");
//copy stdout.write function
let fn = process.stdout.write;

process.stdout.write = function () {
  const {
    __config: {},
  } = global;
  const timestamp = timeStamp();
  arguments["0"] = chalk.greenBright(timestamp) + " - " + arguments["0"];
  fn.apply(process.stdout, arguments);

  //write log to file
  if (__config.logging) {
    fs.appendFile(__config.out_file || "./log.txt", arguments[0], (err) => {
      if (err) throw err;
    });
  }
  process.emit("__log", arguments["0"]);
};
//copy stderr.write function
fn = process.stderr.write;
process.stderr.write = function () {
  const {
    __config: {},
  } = global;

  const timestamp = timeStamp();
  arguments["0"] = chalk.redBright(timestamp) + " - " + arguments["0"];
  fn.apply(process.stderr, arguments);

  //write err to file
  if (__config.logging) {
    fs.appendFile(__config.error_file || "./err.txt", arguments[0], (err) => {
      if (err) throw err;
    });
  }
  process.emit("__error", arguments["0"]);
};

function timeStamp() {
  let timestamp = new Date().toUTCString().split(" ");
  timestamp.pop();
  timestamp.shift();
  timestamp = timestamp.join("-");
  return timestamp;
}
