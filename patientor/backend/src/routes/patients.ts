import express, { type Request, type Response } from "express";

import patientService from "../services/patientService.ts";
import type { NonSensitivePatient } from "../types.ts";

const router = express.Router();

router.get("/", (_req: Request, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getNonSensitivePatients());
});

export default router;
