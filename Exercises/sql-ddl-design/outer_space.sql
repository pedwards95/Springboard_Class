-- from the terminal run:
-- psql < outer_space.sql

DROP DATABASE IF EXISTS outer_space;

CREATE DATABASE outer_space;

\c outer_space

CREATE TABLE planets
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  orbital_period_in_years FLOAT NOT NULL,
  orbits_id INTEGER NOT NULL REFERENCES orbits(id),
  galaxy_id INTEGER NOT NULL REFERENCES galaxies(id)
);

CREATE TABLE orbits
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE galaxies
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE moons
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE planets_moons
(
  planet_id INTEGER NOT NULL REFERENCES planets(id),
  moon_id INTEGER NOT NULL REFERENCES moons(id)
);