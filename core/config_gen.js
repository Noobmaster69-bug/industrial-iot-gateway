require("dotenv").config();
const {
  LOGGING,
  OUT_FILE,
  ERROR_FILE,
  ORIGIN,
  HTTP_PORT,
  HTTPS_PORT,
  SSL_CERT,
  SSL_KEY,
  SSL_CA,
} = process.env;
console.log({
  LOGGING,
  OUT_FILE,
  ERROR_FILE,
  ORIGIN,
  HTTP_PORT,
  HTTPS_PORT,
  SSL_CERT,
  SSL_KEY,
  SSL_CA,
});
const fs = require("fs");
fs.writeFileSync(
  "./config.json",
  JSON.stringify({
    logging: JSON.parse(LOGGING.toLowerCase()),
    out_file: OUT_FILE,
    error_file: ERROR_FILE,
    origin: ORIGIN,
    http_port: Number(HTTP_PORT),
    https_port: Number(HTTPS_PORT),
    cert: SSL_CERT,
    key: SSL_KEY,
    ca: [SSL_CA],
  })
);
