import type { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export default function validationRejector(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errors = validationResult(req).formatWith(
    ({ location, msg, param }) => {
      return `${location}[${param}]: ${msg}`;
    }
  );
  if (errors.isEmpty()) {
    return next();
  } else {
    res.status(400).json({ errors: errors.array() });
  }
}
