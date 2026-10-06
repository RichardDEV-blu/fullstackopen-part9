import express, { type Request, type Response } from "express";

import patientService from "../services/patientService.ts";
import {
  type NewPatient,
  NewPatientSchema,
  type NonSensitivePatient,
  type Patient,
} from "../types.ts";

const router = express.Router();

router.get("/", (_req: Request, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getNonSensitivePatients());
});

router.post("/", (req: Request, res: Response<Patient | { error: string }>) => {
  const newPatient: NewPatient = NewPatientSchema.parse(req.body);
  const addedPatient: Patient = patientService.addPatient(newPatient);
  res.status(200).json(addedPatient);
});

export default router;
