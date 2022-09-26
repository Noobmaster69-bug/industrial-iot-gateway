module.exports = (app) => {
  const { Accounts } = require("../database");

  const jwt = require("jsonwebtoken");
  const jwtOptions = require("../../const.json");
  const Router = require("express").Router();

  Router.post("/", async (req, res) => {
    const { username, password } = req.body;
    Accounts.validator({ userName: username, password })
      .then((user) => {
        const { id, role } = user;
        let payload = { username, id, role };
        let token = jwt.sign(payload, jwtOptions.secretOrKey, {
          expiresIn: "2h",
        });
        res.cookie("token", token, { maxAge: 2 * 3600 * 1000 });
        res.json({ ...payload, token });
      })
      .catch((err) => res.status(401).send(err.message));
  });
  Router.get("/", async (req, res) => {
    try {
      if (req?.cookies?.token) {
        const jwt_payload = jwt.verify(
          req.cookies.token,
          jwtOptions.secretOrKey,
          { maxAge: "2h" }
        );
        if (jwt_payload.id) {
          const {
            id,
            userName: username,
            role,
          } = await Accounts.getUserbyId(jwt_payload.id);
          res.send({ id, username, role });
        } else {
          throw new Error("No user id found");
        }
      } else {
        throw new Error("No cookie found");
      }
    } catch (err) {
      res.sendStatus(401);
    }
  });
  Router.delete("/", async (req, res) => {
    res.clearCookie("token").send(200);
  });
  return Router;
};
