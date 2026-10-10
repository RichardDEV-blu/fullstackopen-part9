import express, { type Request, type Response } from "express";
import { NewEntrySchema } from "../../schemas.ts";
import patientService from "../services/patientService.ts";
import {
  type NewPatient,
  NewPatientSchema,
  type NonSensitivePatient,
  type Patient,
  type Entry,
} from "../types.ts";

const router = express.Router();

router.get("/", (_req: Request, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getNonSensitivePatients());
});

router.get(
  "/:id",
  (
    req: Request<{ id: string }>,
    res: Response<Patient | { error: string }>,
  ) => {
    const patient: Patient | undefined = patientService.getPatientById(
      req.params.id,
    );

    if (!patient) {
      res.status(400).json({ error: "Patient not found" });
    }

    res.json(patient);
  },
);

router.post("/", (req: Request, res: Response<Patient | { error: string }>) => {
  const newPatient: NewPatient = NewPatientSchema.parse(req.body);
  const addedPatient: Patient = patientService.addPatient(newPatient);
  res.status(200).json(addedPatient);
});

router.post(
  "/:id/entries",
  (req: Request<{ id: string }>, res: Response<Entry | { error: unknown }>) => {
    const parsedEntry = NewEntrySchema.safeParse(req.body);
    if (!parsedEntry.success) {
      res.status(400).json({
        error: parsedEntry.error.issues,
      });
      return;
    }
    const patientId = req.params.id;

    if (typeof patientId !== "string") {
      res.status(400).json({ error: "Invalid patient id" });
      return;
    }
    const addedEntry = patientService.addEntry(patientId, parsedEntry.data);
    if (!addedEntry) {
      res.status(404).json({
        error: "Patient not found",
      });
      return;
    }

    res.status(201).json(addedEntry);
  },
);

export default router;
