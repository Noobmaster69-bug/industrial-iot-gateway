import passportJWT from "passport-jwt";
import passport from "passport";
import { Users } from "users/models";
import { AuthConfig } from "./models";
import type { Request, Response, NextFunction } from "express";
const Strategy = passportJWT.Strategy;
const extract = passportJWT.ExtractJwt;
const strategy = new Strategy(
  {
    jwtFromRequest: extract.fromAuthHeaderAsBearerToken(),
    secretOrKeyProvider: async (
      _request: any,
      _rawJWTToken: any,
      done: (error: any, secret: string) => void
    ) => {
      const jwtSecret = await AuthConfig.getJwtSecret();
      done(null, jwtSecret);
    },
    algorithms: ["RS256"],
  },
  async (payload: { id: number }, done: (error: any, user: any) => void) => {
    const user = await Users.findByPk(payload.id, {
      attributes: { exclude: ["password", "createdAt", "updatedAt"] },
    });
    if (user) {
      return done(null, user.toJSON());
    } else {
      return done(null, false);
    }
  }
);
passport.use(strategy);

export { passport };
export const authenticate = passport.authenticate("jwt", { session: false });

export function authorize(roles: Array<"admin">) {
  return function (
    req: Request & { user: { role: "admin" } },
    res: Response,
    next: NextFunction
  ) {
    const { role } = req.user as unknown as { role: "admin" };
    if (roles.some((value) => value === role)) {
      return next();
    }
    return res.sendStatus(503);
  };
}
