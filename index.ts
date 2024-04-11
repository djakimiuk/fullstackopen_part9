import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { isNumber } from "./utils";
const app = express();

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
