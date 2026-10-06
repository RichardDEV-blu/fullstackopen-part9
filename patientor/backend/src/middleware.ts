import { type NextFunction, type Request, type Response } from "express";
import { z } from "zod";

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
    return;
  }

  res.status(400).send({ error: "unknown error" });
};

export default errorMiddleware;
