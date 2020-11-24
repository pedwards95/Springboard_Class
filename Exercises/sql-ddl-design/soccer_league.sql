-- Design a schema for a simple sports league.
    -- All of the teams in the league
    -- All of the goals scored by every player for each game
    -- All of the players in the league and their corresponding teams
    -- All of the referees who have been part of each game
    -- All of the matches played between teams
    -- All of the start and end dates for season that a league has
    -- The standings/rankings of each team in the league (This doesn’t have to be its own table if the data can be captured somehow).

DROP DATABASE IF EXISTS soccer_league;

CREATE DATABASE soccer_league;

\c soccer_league;

CREATE TABLE teams
(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE players
(
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    team_id INTEGER REFERENCES teams(id)
);

CREATE TABLE games
(
    id SERIAL PRIMARY KEY,
    team_one_id INTEGER REFERENCES teams(id),
    team_two_id INTEGER REFERENCES teams(id),
    game_date DATE NOT NULL
);

CREATE TABLE goals
(
    id SERIAL PRIMARY KEY,
    game_id INTEGER NOT NULL REFERENCES games(id),
    player_id INTEGER NOT NULL REFERENCES players(id)
);

CREATE TABLE referees
(
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL
);

CREATE TABLE games_referees
(
    game_id INTEGER REFERENCES games(id),
    referee_id INTEGER REFERENCES referees(id)
);

CREATE TABLE seasons
(
    id SERIAL PRIMARY KEY,
    season_start DATE NOT NULL,
    season_end DATE
);
