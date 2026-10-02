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

console.log(calculateExercises([6, 12, 2, 1.3, 0, 0, 7], 7));
