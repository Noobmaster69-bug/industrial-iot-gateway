const converter = require("widdershins");
const fs = require("fs");
const apiStr = fs.readFileSync("./api.yml");
const yaml = require("yaml");
const apiObj = yaml.parse(apiStr.toString());
const options = {};
options.tocSummary = true;
options.expandBody = true;
options.code = true;
options.omitHeader = true;
converter.convert(apiObj, options).then((str) => {
  fs.writeFileSync(
    "./docs/api.md",
    `---
sidebar_position: 5
sidebar_label: API
---

# API

${String(str).slice(38)}
`.replaceAll("<!-- backwards compatibility -->\n", " ")
  );
});
