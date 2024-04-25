import express from "express";
import patientService from "../services/patientService";
import toNewPatient from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getPatientsExceptSsn());
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error) {
    const errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      res.status(400).send(`${errorMessage} Error: ${error.message}`);
    }
  }
});

export default router;
