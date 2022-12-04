import { Router } from "express";
import { UserController } from "users/controller";
const routes = Router();

routes.get("/users", UserController.getUsers);

routes.get("/user", UserController.getUser);
routes.post("/user", UserController.newUser);
routes.put("/user", UserController.changePassword);
routes.delete("/user", UserController.deleteUser);

export default routes;
