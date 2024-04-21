import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { isNumber } from "./utils";
import { Result, calculateExercises } from "./exerciseCalculator";
const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;
  try {
    if (height && weight && isNumber(height) && isNumber(weight)) {
      const response = calculateBmi(Number(height), Number(weight));
      res.json({ height, weight, bmi: response });
    } else {
      throw new Error("malformatted parameters");
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({ error: error.message });
    }
  }
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || !target) {
    res.status(400).send({ error: "parameters missing" });
  }
  if (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    !daily_exercises.every((e: unknown) => isNumber(e)) &&
    !isNumber(target)
  ) {
    res.status(400).send({ error: "malformatted parameters" });
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const response: Result = calculateExercises(daily_exercises, target);
  res.send({ response });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
