import { Chip, Stack, Typography } from "@mui/material";
import type { Entry } from "../types";

interface Props {
  entry: Entry;
}

const assertNever = (value: never): never => {
  throw new Error(`Unhandled entry type: ${JSON.stringify(value)}`);
};

const EntryDetails = ({ entry }: Props) => {
  let details;
  switch (entry.type) {
    case "HealthCheck":
      details = <Typography>Health rating: {entry.healthCheckRating}</Typography>;
      break;
    case "Hospital":
      details = <Typography>Discharge: {entry.discharge.date} — {entry.discharge.criteria}</Typography>;
      break;
    case "OccupationalHealthcare":
      details = (
        <>
          <Typography>Employer: {entry.employerName}</Typography>
          {entry.sickLeave && (
            <Typography>Sick leave: {entry.sickLeave.startDate} — {entry.sickLeave.endDate}</Typography>
          )}
        </>
      );
      break;
    default:
      return assertNever(entry);
  }

  return (
    <Stack spacing={0.75}>
      <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
        <Chip size="small" label={entry.type === "OccupationalHealthcare" ? "Occupational healthcare" : entry.type} color="primary" variant="outlined" />
        <Typography variant="body2" color="text.secondary">{entry.date}</Typography>
      </Stack>
      <Typography variant="h6">{entry.description}</Typography>
      {details}
      <Typography variant="body2" color="text.secondary">Specialist: {entry.specialist}</Typography>
    </Stack>
  );
};

export default EntryDetails;
