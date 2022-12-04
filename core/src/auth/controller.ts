import { Users } from "users";
import { AuthConfig } from "./models";
import type { Request, Response } from "express";
import logger from "logger";
import { clientId } from "mqttClient";
import jwt from "jsonwebtoken";

class AuthController {
  public static async getAuth(req: Request, res: Response) {
    if (req.user) {
      return res.send(req.user);
    }
    return res.sendStatus(400);
  }
  public static async login(req: Request, res: Response) {
    const { username, password } = req.body;
    try {
      const user = await Users.authenticate({ username, password });
      if (user) {
        const jwtSecret = await AuthConfig.getJwtSecret();
        const { id } = user.toJSON();
        const token = jwt.sign({ id }, jwtSecret, { algorithm: "RS256" });
        return res.send({
          accessToken: token,
        });
      }
      return res.status(401).send("Incorrect username or password");
    } catch (err: any) {
      logger.warn(err["message"]);
      return res.status(404).send(err["message"]);
    }
  }
  public static async mqttAuth(req: Request, res: Response) {
    const { clientid, username, password } = req.body;
    if (clientid === clientId) {
      return res.sendStatus(200);
    }
    if (username !== undefined && password !== undefined) {
      try {
        const user = await Users.authenticate({ username, password });
        if (user) {
          return res.sendStatus(200);
        }
        throw new Error("user not found");
      } catch (err) {}
    }
    const jwtSecret = await AuthConfig.getJwtSecret();
    const result = jwt.verify(clientid, jwtSecret, {
      algorithms: ["RS256"],
    });
    if (result) {
      return res.sendStatus(200);
    }

    return res.sendStatus(400);
  }
}
export { AuthController };
