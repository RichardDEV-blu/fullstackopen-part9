import express, { type Request, type Response } from "express";

import patientService from "../services/patientService.ts";
import type { NewPatient, NonSensitivePatient, Patient } from "../types.ts";

const router = express.Router();

router.get("/", (_req: Request, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getNonSensitivePatients());
});

router.post("/", (req: Request, res: Response<Patient>) => {
  const newPatient = req.body as NewPatient;
  const addedPatient = patientService.addPatient(newPatient);
  res.status(201).json(addedPatient);
});

export default router;
