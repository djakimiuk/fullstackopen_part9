interface Result {
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
  if (args.slice(2).every((e) => !isNaN(Number(e)))) {
    return {
      exercisePeriod: args.slice(3, args.length).map(Number),
      target: Number(args[2]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const calculateExercises = (
  exercisePeriod: number[],
  target: number
): Result => {
  const hoursSum = exercisePeriod.reduce((sum, currentValue) => {
    return (sum += currentValue);
  }, 0);
  const avgValue = hoursSum / exercisePeriod.length;
  return {
    periodLength: exercisePeriod.length,
    trainingDays: exercisePeriod.filter((e) => e !== 0).length,
    success: avgValue >= target,
    rating: 2,
    ratingDescription: "not bad",
    target: target,
    average: avgValue,
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
