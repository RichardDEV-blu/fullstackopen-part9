import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography, Box, Stack } from "@mui/material";

import { apiBaseUrl } from "./constants";
import { Patient } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import PatientDetails from "./components/PatientDetails";
const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "grey.50", py: { xs: 2, sm: 4 } }}>
      <Router>
        <Container maxWidth="md">
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
            <Typography component="div" variant="h3" color="primary.main" sx={{ fontWeight: 700, fontSize: { xs: "2rem", sm: "3rem" } }}>
              Patientor
            </Typography>
            <Button component={Link} to="/" variant="outlined" color="primary">
              Patient list
            </Button>
          </Stack>
          <Divider sx={{ my: 3 }} />
          <Routes>
            <Route
              path="/"
              element={
                <PatientListPage
                  patients={patients}
                  setPatients={setPatients}
                />
              }
            />
            <Route path="/patients/:id" element={<PatientDetails />} />
          </Routes>
        </Container>
      </Router>
    </Box>
  );
};

export default App;
