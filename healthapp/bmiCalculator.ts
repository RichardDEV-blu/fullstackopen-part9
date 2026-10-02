import { isNotNumber } from "./utils.ts";

export const calculateBmi = (height: number, weight: number): string => {
  if (height <= 0 || weight <= 0) {
    throw new Error("Height and weight must be positive numbers");
  }

  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);

  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi < 25) {
    return "Normal range";
  } else if (bmi < 30) {
    return "Overweight";
  } else {
    return "Obese";
  }
};

const parseArguments = (args: string[]): { height: number; weight: number } => {
  if (args.length !== 4) {
    throw new Error("Expected exactly two arguments: height and weight");
  }
  if (isNotNumber(args[2]) || isNotNumber(args[3])) {
    throw new Error("Provided values were not numbers");
  }
  const height = Number(args[2]);
  const weight = Number(args[3]);
  if (height <= 0 || weight <= 0) {
    throw new Error("Height and weight must be positive numbers");
  }
  return { height, weight };
};

if (process.argv[1] === import.meta.filename) {
  try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(`Error: ${error.message}`);
    }
  }
}
