module.exports = (app) => {
  const { Accounts } = require("../database");

  const jwt = require("jsonwebtoken");
  const jwtOptions = {
    secretOrKey: "haha",
  };

  const cookieParser = require("cookie-parser");
  app.use(cookieParser());
  app.use("/api", (req, res, next) => {
    if (req?.cookies?.token) {
      const jwt_payload = jwt.verify(req.cookies.token, jwtOptions.secretOrKey);
      if (jwt_payload.id) {
        next();
      } else {
        res.sendStatus(401);
      }
    } else {
      res.sendStatus(401);
    }
  });
  const Router = require("express").Router();
  Router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    Accounts.validator({ userName: username, password })
      .then((user) => {
        const { id, role } = user;
        let payload = { username, id, role };
        let token = jwt.sign(payload, jwtOptions.secretOrKey);
        res.cookie("token", token);
        res.json({ ...payload, token });
      })
      .catch((err) => res.status(401).send(err.message));
  });
  Router.get("/login", async (req, res) => {
    if (req?.cookies?.token) {
      const jwt_payload = jwt.verify(req.cookies.token, jwtOptions.secretOrKey);
      if (jwt_payload.id) {
        Accounts.getUserbyId(jwt_payload.id)
          .then((user) => {
            res.send({
              id: user.id,
              username: user.userName,
              role: user.role,
            });
          })
          .catch((err) => {
            res.sendStatus(401);
          });
      } else {
        res.sendStatus(401);
      }
    } else {
      res.sendStatus(401);
    }
  });
  Router.delete("/login", async (req, res) => {
    res.clearCookie("token").send(200);
  });
  return Router;
};
