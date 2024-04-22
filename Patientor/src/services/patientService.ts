import patients from "../../data/patients";
import { PatientExceptSsn, Patient } from "../../types";

const getPatientsExceptSsn = (): PatientExceptSsn[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatients = (): Patient[] => {
  return patients;
};

export default { getPatientsExceptSsn, getPatients };
