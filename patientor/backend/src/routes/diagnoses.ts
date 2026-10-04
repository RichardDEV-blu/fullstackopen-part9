import express, { type Request, type Response } from "express";

import diagnosisService from "../services/diagnosisService.ts";
import type { Diagnosis } from "../types.ts";

const router = express.Router();

router.get("/", (_req: Request, res: Response<Diagnosis[]>) => {
  res.send(diagnosisService.getDiagnoses());
});

export default router;
