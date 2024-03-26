interface BmiValues {
  height: number;
  weight: number;
}

const parseBmiValues = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error("Not enough arguments!");
  if (args.length > 4) throw new Error("Too many arguments!");
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]) / 100,
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const calculateBmi = (height: number, weight: number): string => {
  const bmi: number = weight / Math.pow(height, 2);
  if (bmi < 16) return "Underweight (Severe thinness)";
  if (bmi >= 16 && bmi <= 16.9) return "Underweight (Moderate thinness)";
  if (bmi >= 17 && bmi <= 18.4) return "Underweight (Mild thinness)";
  if (bmi >= 18.5 && bmi <= 24.9) return "Normal (healthy weight)";
  if (bmi >= 25 && bmi <= 29.9) return "Overweight (Pre-obese)";
  if (bmi >= 30 && bmi <= 34.9) return "Obese (Class I)";
  if (bmi >= 35 && bmi <= 39.9) return "Obese (Class II)";
  if (bmi >= 40) return "Obese (Class III)";
};

try {
  const { height, weight } = parseBmiValues(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error) {
  if (error instanceof Error) {
    console.log(error.message);
  }
}
