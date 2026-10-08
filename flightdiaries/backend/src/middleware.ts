import { type Request, type Response, type NextFunction } from 'express';
import { NewEntrySchema, type NewDiaryEntry } from './types.ts';
import { z } from 'zod';

export const newDiaryParser = (
  req: Request<unknown, unknown, NewDiaryEntry>,
  _res: Response,
  next: NextFunction,
) => {
  try {
    NewEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

export const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues.map((issue) => issue.message).join(", ") });
  } else {
    next(error);
  }
};
