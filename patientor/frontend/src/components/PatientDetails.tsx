import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Patient } from "../types";
import patientService from "../services/patients";

const PatientDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [error, setError] = useState<string | null>(null);
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

  if (error) {
    return <p>{error}</p>;
  }

  if (!patient) {
    return <p>Loading patient information...</p>;
  }

  return (
    <div>
      <h2>{patient.name}</h2>
      <p>SSN: {patient.ssn}</p>
      <p>Date of birth: {patient.dateOfBirth}</p>
      <p>Occupation: {patient.occupation}</p>
      <p>Gender: {patient.gender}</p>

      <h5>Entries</h5>

      {patient.entries.map((entry) => (
        <div key={entry.id}>
          <p>
            {entry.date} {entry.description}
          </p>

          <p>Diagnosis codes: {entry.diagnosisCodes?.join(", ") ?? "None"}</p>
        </div>
      ))}
    </div>
  );
};

export default PatientDetails;
