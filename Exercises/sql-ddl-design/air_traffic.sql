-- from the terminal run:
-- psql < air_traffic.sql

DROP DATABASE IF EXISTS air_traffic;

CREATE DATABASE air_traffic;

\c air_traffic

CREATE TABLE buyers
(
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL
);

CREATE TABLE places
(
  id SERIAL PRIMARY KEY,
  city TEXT NOT NULL,
  country TEXT NOT NULL
);

CREATE TABLE flights
(
  id SERIAL PRIMARY KEY,
  departure TIMESTAMP NOT NULL,
  arrival TIMESTAMP NOT NULL,
  airline TEXT NOT NULL,
  from_id INTEGER NOT NULL REFERENCES places(id),
  to_id INTEGER NOT NULL REFERENCES places(id)
);

CREATE TABLE tickets
(
  id SERIAL PRIMARY KEY,
  buyer_id INTEGER NOT NULL REFERENCES buyers(id),
  seat TEXT NOT NULL,
  flight_id INTEGER NOT NULL REFERENCES flights(id)
);