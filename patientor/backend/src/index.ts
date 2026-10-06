import express from "express";
import cors from "cors";
import patientsRouter from "./routes/patients.ts";
import diagnosesRouter from "./routes/diagnoses.ts";
import errorMiddleware from "./middleware.ts";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/ping", (_req, res) => {
  res.send("pong");
});

app.use("/api/patients", patientsRouter);
app.use("/api/diagnoses", diagnosesRouter);

app.use(errorMiddleware);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
