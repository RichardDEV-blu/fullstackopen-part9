import express, { type Request, type Response } from "express";

import patientService from "../services/patientService.ts";
import type { NewPatient, NonSensitivePatient, Patient } from "../types.ts";
import { parseNewPatient } from "../utils.ts";

const router = express.Router();

router.get("/", (_req: Request, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getNonSensitivePatients());
});

router.post("/", (req: Request, res: Response<Patient | { error: string }>) => {
  try {
    const newPatient: NewPatient = parseNewPatient(req.body);
    const addedPatient: Patient = patientService.addPatient(newPatient);
    res.status(201).json(addedPatient);
  } catch (error: unknown) {
    let errorMsg = "Something went wrong.";
    if (error instanceof Error) {
      errorMsg += " Error: " + error.message;
      res.status(400).send({ error: errorMsg });
    }
  }
});

export default router;
