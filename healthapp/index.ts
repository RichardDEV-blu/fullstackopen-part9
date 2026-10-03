import express from "express";
import { calculateBmi } from "./bmiCalculator.ts";
import { calculateExercises } from "./exerciseCalculator.ts";
import type { Request, Response } from "express";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;
  if (typeof height !== "string" || typeof weight !== "string") {
    res.status(400).json({
      error: "malformatted parameters",
    });
    return;
  }

  const heightNumber = Number(height);
  const weightNumber = Number(weight);

  if (!Number.isFinite(heightNumber) || !Number.isFinite(weightNumber)) {
    res.status(400).json({
      error: "malformatted parameters",
    });
    return;
  }

  const bmi = calculateBmi(heightNumber, weightNumber);
  res.json({
    weight: weightNumber,
    height: heightNumber,
    bmi,
  });
});

app.post("/exercises", (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const body: any = req.body;
  if (body.daily_exercises === undefined || body.target === undefined) {
    return res.status(400).json({
      error: "parameters missing",
    });
  }

  if (
    !Array.isArray(body.daily_exercises) ||
    body.daily_exercises.length === 0 ||
    isNaN(Number(body.target)) ||
    !body.daily_exercises.every(
      (exercise: unknown) => !isNaN(Number(exercise)) && exercise !== "",
    )
  ) {
    return res.status(400).json({
      error: "malformatted parameters",
    });
  }

  const dailyExercises = body.daily_exercises.map((exercise: unknown) =>
    Number(exercise),
  );

  const target = Number(body.target);

  const result = calculateExercises(dailyExercises, target);

  return res.json(result);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
