import validationRejector from "utils/validator";
import { query, oneOf, body } from "express-validator";

class UsersValidator {
  private constructor() {}
  public static GetUser = [
    query("id").isNumeric().optional(),
    query("name").isString().optional(),
    oneOf(
      [query("id").exists(), query("name").exists()],
      "id and name cannot empty"
    ),
    validationRejector,
  ];
  public static ChangePassword = [
    body("password").exists(),
    body("newPassword").exists(),
    validationRejector,
  ];
}

export default UsersValidator;
