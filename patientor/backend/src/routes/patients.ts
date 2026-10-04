import express, { type Request, type Response } from "express";
import patients from "../data/patients.ts";
import type { NonSensitivePatient } from "../types.ts";

const router = express.Router();

router.get("/", (_req: Request, res: Response<NonSensitivePatient[]>) => {
  const nonSensitivePatients: NonSensitivePatient[] = patients.map(
    ({ id, name, dateOfBirth, gender, occupation }) => {
      return {
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
      };
    },
  );

  res.send(nonSensitivePatients);
});

export default router;
