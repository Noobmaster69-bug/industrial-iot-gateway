import type { Request, Response } from "express";
import { Users } from "./models";
import logger from "logger";
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
  public static async newUser(req: Request, res: Response) {
    const { username, password, role } = req.body;
    try {
      await Users.create({ username, password, role });
      res.sendStatus(201);
    } catch (error: any) {
      logger.warn(error);
      res.status(400).send(error);
    }
  }
  public static async changePassword(req: Request, res: Response) {
    const { username } = req.user as unknown as { username: string };
    const { oldPassword, newPassword } = req.body as unknown as {
      oldPassword: string;
      newPassword: string;
    };
    if (await Users.authenticate({ username, password: oldPassword })) {
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
  public static async deleteUser(req: Request, res: Response) {
    const { username, id } = req.query as unknown as {
      username: string;
      id: number;
    };
    let user: Users | null;
    if (id) {
      user = await Users.findByPk(id, {});
    } else {
      user = await Users.findOne({
        where: {
          username,
        },
      });
    }
    if (user) {
      await user.destroy();
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  }
  public static async getUsers(req: Request, res: Response) {
    const { id, username, role, limit, start, orderBy, order } =
      req.query as unknown as {
        id: number;
        username: string;
        role: "admin";
        limit: number;
        start: number;
        orderBy: "username" | "role" | "createdAt";
        order: "desc" | "asc";
      };
    try {
      const users = await Users.findAndCountAll({
        where: JSON.parse(
          JSON.stringify({
            username,
            id,
            role,
          })
        ),
        limit,
        offset: start,
        order: [[orderBy || "username", (order || "desc").toUpperCase()]],
      });

      return res.send({
        limit: limit || 10,
        start: start || 0,
        users: users.rows.map((e) => e.toJSON()),
        total: users.count,
      });
    } catch (err) {
      logger.warn("user: " + err);
      return res.status(400).send(err);
    }
  }
}
export { UserController };
