import { Gender, PatientExceptId } from "../types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseString = (param: unknown): string => {
  if (!isString(param)) {
    throw new Error(`Incorrect value type: ${param}`);
  } else return param;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error(`Incorrect date: ${date}`);
  }
  return date;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error(`Incorrect gender: ${gender}`);
  }
  return gender;
};

const toNewPatient = (object: unknown): PatientExceptId => {
  if (!object || typeof object !== "object") {
    throw new Error(`Incorrect or missing data!`);
  }
  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newPatient: PatientExceptId = {
      name: parseString(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseString(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation),
    };
    return newPatient;
  }
  throw new Error(`Incorrect data: some fields are missing!`);
};

export default toNewPatient;
