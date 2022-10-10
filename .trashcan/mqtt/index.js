const app = require("express")();
(async function () {
  //config middleware
  require("./src/middleware")(app);
  //config route
  require("./src/router")(app);
  //run server
  app.listen(33335, () => {
    console.log("ds-mqtt is running on port 33335");
  });
})();
