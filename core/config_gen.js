require("dotenv").config();
const {
  logging,
  out_file,
  error_file,
  origin,
  http_port,
  https_port,
  cert,
  key,
  ca,
} = process.env;

const fs = require("fs");
fs.writeFileSync(
  "./config.json",
  JSON.stringify({
    logging,
    out_file,
    error_file,
    origin,
    http_port,
    https_port,
    cert,
    key,
    ca: [ca],
  })
);
