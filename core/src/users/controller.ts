import type { Request, Response } from "express";
import { Users } from "./models";
// import createLogger from "logger";
// const logger = createLogger("user");
class UserController {
  public static async getUser(req: Request, res: Response) {
    const { username, id } = req.query as unknown as {
      username: string;
      id: number;
    };
    let user: Users | null;
    if (id) {
      user = await Users.findByPk(id, {
        attributes: {
          exclude: ["password"],
        },
      });
    } else {
      user = await Users.findOne({
        where: {
          username,
        },
        attributes: {
          exclude: ["password"],
        },
      });
    }
    if (user) {
      res.send(user.toJSON());
    } else {
      res.sendStatus(404);
    }
  }
  /**
   * TODO: refactor type
   * @param req
   * @param res
   * @returns
   */
  public static async changePassword(
    req: Request & { user?: { username: string } },
    res: Response
  ) {
    const username = req.user?.username || "";
    const { password, newPassword } = req.body as unknown as {
      password: string;
      newPassword: string;
    };
    if (await Users.authenticate({ username, password })) {
      try {
        await Users.update(
          { password: newPassword },
          {
            where: {
              username: ["username"],
            },
          }
        );
        return res.send(202);
      } catch (error: any) {
        return res.status(400).send(error);
      }
    }
    return res.sendStatus(400);
  }
}
export { UserController };
