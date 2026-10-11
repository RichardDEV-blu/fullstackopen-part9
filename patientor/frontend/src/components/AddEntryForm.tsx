import { useState, type SyntheticEvent } from "react";
import axios from "axios";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";
import type { Diagnosis, Entry, EntryWithoutId, HealthCheckRating } from "../types";
import { HealthCheckRating as Rating } from "../types";
import patientService from "../services/patients";

type EntryType = Entry["type"];

interface Props {
  patientId: string;
  diagnoses: Diagnosis[];
  onEntryAdded: (entry: Entry) => void;
}

const AddEntryForm = ({ patientId, diagnoses, onEntryAdded }: Props) => {
  const [formOpen, setFormOpen] = useState(false);
  const [type, setType] = useState<EntryType>("HealthCheck");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(Rating.Healthy);
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStart, setSickLeaveStart] = useState("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState("");
  const [error, setError] = useState<string | null>(null);

  const submit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const commonFields = {
      description,
      date,
      specialist,
      ...(diagnosisCodes.length > 0 ? { diagnosisCodes } : {}),
    };

    let entry: EntryWithoutId;
    switch (type) {
      case "HealthCheck":
        entry = { ...commonFields, type: "HealthCheck", healthCheckRating };
        break;
      case "Hospital":
        entry = {
          ...commonFields,
          type: "Hospital",
          discharge: { date: dischargeDate, criteria: dischargeCriteria },
        };
        break;
      case "OccupationalHealthcare":
        entry = {
          ...commonFields,
          type: "OccupationalHealthcare",
          employerName,
          ...(sickLeaveStart && sickLeaveEnd
            ? { sickLeave: { startDate: sickLeaveStart, endDate: sickLeaveEnd } }
            : {}),
        };
        break;
    }

    try {
      const addedEntry: Entry = await patientService.addEntry(patientId, entry);
      onEntryAdded(addedEntry);
      setFormOpen(false);
      setDescription("");
      setDate("");
      setSpecialist("");
      setDiagnosisCodes([]);
      setHealthCheckRating(Rating.Healthy);
      setDischargeDate("");
      setDischargeCriteria("");
      setEmployerName("");
      setSickLeaveStart("");
      setSickLeaveEnd("");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const data: unknown = err.response?.data;
        if (typeof data === "object" && data !== null && "error" in data) {
          const serverError = data.error;
          if (Array.isArray(serverError)) {
            setError(
              serverError
                .map((issue: { path?: (string | number)[]; message?: string }) => {
                  const field = issue.path?.join(".") || "Entry";
                  return `${field}: ${issue.message ?? "Invalid value"}`;
                })
                .join("; "),
            );
            return;
          }
          if (typeof serverError === "string") {
            setError(serverError);
            return;
          }
        }
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  const sickLeaveIncomplete = Boolean(sickLeaveStart) !== Boolean(sickLeaveEnd);
  const dateField = (id: string, label: string, value: string, setValue: (value: string) => void, required = false) => (
    <FormControl fullWidth required={required}>
      <InputLabel htmlFor={id} shrink>{label}</InputLabel>
      <Input
        id={id}
        type="date"
        value={value}
        onChange={({ target }) => setValue(target.value)}
        inputProps={{ "aria-label": label, required }}
      />
    </FormControl>
  );

  const onDiagnosisChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    setDiagnosisCodes(typeof value === "string" ? value.split(",") : value);
  };

  if (!formOpen) {
    return (
      <Button variant="contained" sx={{ mt: 3 }} onClick={() => setFormOpen(true)}>
        Add New Entry
      </Button>
    );
  }

  return (
    <Paper component="section" variant="outlined" sx={{ p: { xs: 2, sm: 3 }, mt: 4 }}>
      <Typography component="h2" variant="h5" sx={{ mb: 2 }}>Add a new entry</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>Error: {error}</Alert>}
      <Box component="form" onSubmit={submit}>
        <Stack spacing={2}>
          <TextField
            select label="Entry type" value={type}
            onChange={({ target }) => setType(target.value as EntryType)}
          >
            <MenuItem value="HealthCheck">Health check</MenuItem>
            <MenuItem value="Hospital">Hospital</MenuItem>
            <MenuItem value="OccupationalHealthcare">Occupational healthcare</MenuItem>
          </TextField>

          <TextField label="Description" value={description} onChange={({ target }) => setDescription(target.value)} required />
          {dateField("entry-date", "Date", date, setDate, true)}
          <TextField label="Specialist" value={specialist} onChange={({ target }) => setSpecialist(target.value)} required />

          <FormControl fullWidth>
            <InputLabel id="diagnosis-codes-label">Diagnosis codes</InputLabel>
            <Select
              labelId="diagnosis-codes-label"
              multiple
              value={diagnosisCodes}
              onChange={onDiagnosisChange}
              label="Diagnosis codes"
              renderValue={(selected) => selected.join(", ")}
            >
              {diagnoses.map((diagnosis) => (
                <MenuItem key={diagnosis.code} value={diagnosis.code}>
                  <Checkbox checked={diagnosisCodes.includes(diagnosis.code)} />
                  <ListItemText primary={diagnosis.code} secondary={diagnosis.name} />
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Optional. Select one or more diagnoses.</FormHelperText>
          </FormControl>

          {type === "HealthCheck" && (
            <FormControl fullWidth>
              <InputLabel id="health-check-rating-label">Health check rating</InputLabel>
              <Select
                labelId="health-check-rating-label"
                value={healthCheckRating}
                label="Health check rating"
                onChange={({ target }) => setHealthCheckRating(Number(target.value) as HealthCheckRating)}
              >
                <MenuItem value={Rating.Healthy}>Healthy (0)</MenuItem>
                <MenuItem value={Rating.LowRisk}>Low risk (1)</MenuItem>
                <MenuItem value={Rating.HighRisk}>High risk (2)</MenuItem>
                <MenuItem value={Rating.CriticalRisk}>Critical risk (3)</MenuItem>
              </Select>
            </FormControl>
          )}

          {type === "Hospital" && (
            <>
              <Typography component="h3" variant="h6">Discharge</Typography>
              {dateField("discharge-date", "Discharge date", dischargeDate, setDischargeDate, true)}
              <TextField label="Discharge criteria" value={dischargeCriteria} onChange={({ target }) => setDischargeCriteria(target.value)} required />
            </>
          )}

          {type === "OccupationalHealthcare" && (
            <>
              <TextField label="Employer name" value={employerName} onChange={({ target }) => setEmployerName(target.value)} required />
              <Typography component="h3" variant="h6">Sick leave (optional)</Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                {dateField("sick-leave-start", "Start date", sickLeaveStart, setSickLeaveStart)}
                {dateField("sick-leave-end", "End date", sickLeaveEnd, setSickLeaveEnd)}
              </Stack>
              {sickLeaveIncomplete && (
                <Alert severity="warning">Enter both sick leave dates, or leave both empty.</Alert>
              )}
            </>
          )}

          <Box>
            <Button type="submit" variant="contained" disabled={type === "OccupationalHealthcare" && sickLeaveIncomplete}>
              Add
            </Button>
          </Box>
        </Stack>
      </Box>
    </Paper>
  );
};

export default AddEntryForm;
