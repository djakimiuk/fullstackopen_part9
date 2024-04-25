import patients from "../../data/patients";
import { PatientExceptSsn, Patient, PatientExceptId } from "../../types";
import { v1 as uuid } from "uuid";

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

const addPatient = (patient: PatientExceptId): Patient => {
  const id: string = uuid();
  const newPatient = {
    id: id,
    ...patient,
  };
  patients.push(newPatient);
  return newPatient;
};

export default { getPatientsExceptSsn, getPatients, addPatient };
