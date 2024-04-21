import { isNumber } from "./utils";
export interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface trainingValues {
  exercisePeriod: number[];
  target: number;
}

const parseExerciseValues = (args: string[]): trainingValues => {
  if (args.length < 4) throw new Error("Not enough arguments!");
  if (args.slice(2).every((e) => isNumber(e))) {
    return {
      exercisePeriod: args.slice(3, args.length).map(Number),
      target: Number(args[2]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

export const calculateExercises = (
  exercisePeriod: number[],
  target: number
): Result => {
  const hoursSum = exercisePeriod.reduce((sum, currentValue) => {
    return (sum += currentValue);
  }, 0);
  const avgHourValue = hoursSum / exercisePeriod.length;

  let rating: number;

  if (avgHourValue >= target) {
    rating = 3;
  } else if (target - avgHourValue < 1) {
    rating = 2;
  } else {
    rating = 1;
  }

  return {
    periodLength: exercisePeriod.length,
    trainingDays: exercisePeriod.filter((e) => e !== 0).length,
    success: avgHourValue >= target,
    rating: rating,
    ratingDescription:
      rating === 3 ? "excellent" : rating === 2 ? "not bad" : "bad",
    target: target,
    average: avgHourValue,
  };
};

try {
  const { exercisePeriod, target } = parseExerciseValues(process.argv);
  console.log(calculateExercises(exercisePeriod, target));
} catch (error) {
  if (error instanceof Error) {
    console.log(error.message);
  }
}
