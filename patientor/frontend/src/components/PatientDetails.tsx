import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Alert, Box, Paper, Stack, Typography } from "@mui/material";
import AddEntryForm from "./AddEntryForm";
import type { Patient, Diagnosis, Entry } from "../types";
import patientService from "../services/patients";
import diagnosesService from "../services/diagnoses";
import EntryDetails from "./EntryDetails";

const PatientDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchPatient = async () => {
      if (!id) {
        setError("Patient ID is missing");
        return;
      }
      try {
        const data = await patientService.getById(id);
        setPatient(data);
      } catch {
        setError("Failed to fetch patient information");
      }
    };
    void fetchPatient();
  }, [id]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      try {
        const data = await diagnosesService.getAllDiagnoses();
        setDiagnoses(data);
      } catch (fetchError) {
        console.error("Failed to fetch diagnoses", fetchError);
      }
    };
    void fetchDiagnoses();
  }, []);

  if (error) return <Alert severity="error">{error}</Alert>;
  if (!patient) return <Typography color="text.secondary">Loading patient information...</Typography>;

  const addEntry = (entry: Entry) => {
    setPatient((currentPatient) =>
      currentPatient
        ? { ...currentPatient, entries: [...currentPatient.entries, entry] }
        : currentPatient,
    );
  };

  return (
    <Box>
      <Paper variant="outlined" sx={{ p: { xs: 2, sm: 3 } }}>
        <Typography component="h1" variant="h4" gutterBottom>{patient.name}</Typography>
        <Stack spacing={0.5}>
          <Typography><strong>SSN:</strong> {patient.ssn || "—"}</Typography>
          <Typography><strong>Date of birth:</strong> {patient.dateOfBirth || "—"}</Typography>
          <Typography><strong>Occupation:</strong> {patient.occupation}</Typography>
          <Typography><strong>Gender:</strong> {patient.gender}</Typography>
        </Stack>
      </Paper>

      <Typography component="h2" variant="h5" sx={{ mt: 4, mb: 2 }}>Entries</Typography>
      <Stack spacing={2}>
        {patient.entries.map((entry) => (
          <Paper key={entry.id} variant="outlined" sx={{ p: { xs: 2, sm: 3 } }}>
            <EntryDetails entry={entry} />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              <strong>Diagnoses:</strong>{" "}
              {entry.diagnosisCodes?.map((code) => {
                const diagnosis = diagnoses.find((item) => item.code === code);
                return diagnosis ? `${diagnosis.code} ${diagnosis.name}` : code;
              }).join(", ") ?? "None"}
            </Typography>
          </Paper>
        ))}
      </Stack>

      <AddEntryForm patientId={patient.id} diagnoses={diagnoses} onEntryAdded={addEntry} />
    </Box>
  );
};

export default PatientDetails;
