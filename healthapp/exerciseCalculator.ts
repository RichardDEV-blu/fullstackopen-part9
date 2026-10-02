import { isNotNumber } from "./utils.ts";

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDesc: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  dailyExercisesHours: number[],
  target: number,
): Result => {
  const periodLength = dailyExercisesHours.length;
  const trainingDays = dailyExercisesHours.filter((hours) => hours > 0).length;
  const totalHours = dailyExercisesHours.reduce((sum, hours) => sum + hours, 0);
  const average = totalHours / periodLength;
  const success = average >= target;
  let rating: number;
  let ratingDesc: string;
  if (average >= target) {
    rating = 3;
    ratingDesc = "great job!";
  } else if (average >= target * 0.5) {
    rating = 2;
    ratingDesc = "not too bad";
  } else {
    rating = 1;
    ratingDesc = "bad";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDesc,
    target,
    average,
  };
};

const parseArguments = (
  args: string[],
): { target: number; dailyExerciseHours: number[] } => {
  if (args.length < 4) {
    throw new Error(
      "Not enough arguments. Provide a target and at least one exercise value.",
    );
  }

  if (args.slice(2).some(isNotNumber)) {
    throw new Error("Provided values were not numbers");
  }

  const target = Number(args[2]);
  const dailyExerciseHours = args.slice(3).map(Number);

  if (target <= 0) {
    throw new Error("Target must be a positive number");
  }

  if (dailyExerciseHours.some((hours) => hours < 0)) {
    throw new Error("Exercise hours cannot be negative");
  }

  return { target, dailyExerciseHours };
};

if (process.argv[1] === import.meta.filename) {
  try {
    const { target, dailyExerciseHours } = parseArguments(process.argv);
    console.log(calculateExercises(dailyExerciseHours, target));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(`Error: ${error.message}`);
    }
  }
}
