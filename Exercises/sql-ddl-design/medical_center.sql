-- A medical center employs several doctors
-- A doctors can see many patients
-- A patient can be seen by many doctors
-- During a visit, a patient may be diagnosed to have one or more diseases.

DROP DATABASE IF EXISTS medical_center;

CREATE DATABASE medical_center;

\c medical_center;

CREATE TABLE specialties
(
    id SERIAL PRIMARY KEY,
    specialty TEXT NOT NULL
);

INSERT INTO specialties(specialty)
VALUES ('General');

CREATE TABLE doctors
(
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    specialty_id INTEGER REFERENCES specialties(id) DEFAULT 1
);

CREATE TABLE patients
(
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL
);

CREATE TABLE diseases
(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE patients_diseases
(
    patient_id INTEGER REFERENCES patients(id),
    disease_id INTEGER REFERENCES diseases(id)
);

CREATE TABLE doctors_patients
(
    doctor_id INTEGER REFERENCES doctors(id),
    patient_id INTEGER REFERENCES patients(id)
);

