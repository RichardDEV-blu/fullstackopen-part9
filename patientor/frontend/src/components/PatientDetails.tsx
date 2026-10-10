import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Patient, Diagnosis } from "../types";
import patientService from "../services/patients";
import diagnosesService from "../services/diagnoses";

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
      } catch (error) {
        console.error("Failed to fetch diagnoses", error);
      }
    };
    void fetchDiagnoses();
  }, []);

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

          <p>
            Diagnoses:{" "}
            {entry.diagnosisCodes
              ?.map((code) => {
                const diagnosis = diagnoses.find((d) => d.code === code);
                return diagnosis ? `${diagnosis.code} ${diagnosis.name}` : code;
              })
              .join(", ") ?? "None"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default PatientDetails;
