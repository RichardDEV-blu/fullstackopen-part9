import patients from "../data/patients.ts";
import type {
  NonSensitivePatient,
  NewPatient,
  Patient,
  Entry,
  EntryWithoutId,
} from "../types.ts";
import { v4 as uuid } from "uuid";

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatientById = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};
const addPatient = (entry: NewPatient): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    ...entry,
    entries: [],
  };

  patients.push(newPatient);
  return newPatient;
};

export const addEntry = (
  patientId: string,
  entry: EntryWithoutId,
): Entry | undefined => {
  const patient = patients.find((p) => p.id === patientId);
  if (!patient) {
    return undefined;
  }
  const newEntry: Entry = {
    ...entry,
    id: uuid(),
  };

  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getNonSensitivePatients,
  addPatient,
  getPatientById,
  addEntry,
};
