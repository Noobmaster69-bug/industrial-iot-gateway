import validationRejector from "utils/validator";
import { query } from "express-validator";
class LoggerValidator {
  private constructor() {}
  public static QueryLog = [
    query("from").isString().toDate().optional(),
    query("until").isString().toDate().optional(),
    query("limit").isNumeric().optional(),
    query("order").isString().optional(),
    validationRejector,
  ];
}

export default LoggerValidator;
