import { Router } from "express";
import { UserController } from "users/controller";
import UsersValidator from "./validator";

const routes = Router();

routes.get("/user", UsersValidator.GetUser, UserController.getUser);
routes.put(
  "/user",
  UsersValidator.ChangePassword,
  UserController.changePassword
);

export default routes;
