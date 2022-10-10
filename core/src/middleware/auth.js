module.exports = (app, secretOrKey) => {
  const jwt = require("jsonwebtoken");

  app.use("/api", (req, res, next) => {
    try {
      if (req?.cookies?.token) {
        const jwt_payload = jwt.verify(req.cookies.token, secretOrKey);
        if (jwt_payload.id) {
          next();
        } else {
          throw new Error();
        }
      } else {
        throw new Error();
      }
    } catch (error) {
      res.sendStatus(401);
    }
  });
};
