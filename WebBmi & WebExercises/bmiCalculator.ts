import { isNumber } from "./utils";
export interface BmiValues {
  height: number;
  weight: number;
}

export const parseBmiValues = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error("Not enough arguments!");
  if (args.length > 4) throw new Error("Too many arguments!");
  if (isNumber(args[2]) && isNumber(args[3])) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

export const calculateBmi = (height: number, weight: number): string => {
  const correctHeight: number = height < 3 ? height : height / 100;
  const bmi: number = weight / Math.pow(correctHeight, 2);
  if (bmi < 16) return "Underweight (Severe thinness)";
  else if (bmi >= 16 && bmi <= 16.9) return "Underweight (Moderate thinness)";
  else if (bmi >= 17 && bmi <= 18.4) return "Underweight (Mild thinness)";
  else if (bmi >= 18.5 && bmi <= 24.9) return "Normal (healthy weight)";
  else if (bmi >= 25 && bmi <= 29.9) return "Overweight (Pre-obese)";
  else if (bmi >= 30 && bmi <= 34.9) return "Obese (Class I)";
  else if (bmi >= 35 && bmi <= 39.9) return "Obese (Class II)";
  else return "Obese (Class III)";
};

try {
  const { height, weight } = parseBmiValues(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error) {
  if (error instanceof Error) {
    console.log(error.message);
  }
}
