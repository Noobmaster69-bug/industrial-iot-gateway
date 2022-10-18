require("dotenv").config();
const {
  logging,
  out_file,
  error_file,
  origin,
  http_port,
  https_port,
  ssl_cert,
  ssl_key,
  ssl_ca,
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
    cert: ssl_cert,
    key: ssl_key,
    ca: [ssl_ca],
  })
);
