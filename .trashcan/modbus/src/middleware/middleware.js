module.exports = function (app) {
  const express = require("express");
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(
    require("morgan")(
      "':method :url :status :res[content-length] - :response-time ms'"
    )
  );
};
