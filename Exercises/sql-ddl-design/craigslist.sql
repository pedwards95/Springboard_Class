-- Design a schema for Craigslist!
--     The region of the craigslist post (San Francisco, Atlanta, Seattle, etc)
--     Users and preferred region
--     Posts: contains title, text, the user who has posted, the location of the posting, the region of the posting
--     Categories that each post belongs to

DROP DATABASE IF EXISTS craigslist;

CREATE DATABASE craigslist;

\c craigslist;

CREATE TABLE regions
(
    id SERIAL PRIMARY KEY,
    region TEXT NOT NULL
);

CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    region_id INTEGER REFERENCES regions(id) NOT NULL
);

CREATE TABLE posts
(
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    text TEXT NOT NULL,
    user_id INTEGER REFERENCES users(id),
    location TEXT NOT NULL,
    region_id INTEGER REFERENCES regions(id) NOT NULL
);

CREATE TABLE categories
(
    id SERIAL PRIMARY KEY,
    category TEXT NOT NULL
);

CREATE TABLE users_posts
(
    user_id INTEGER REFERENCES users(id),
    posts_id INTEGER REFERENCES posts(id)
);

CREATE TABLE categories_posts
(
    categories_id INTEGER REFERENCES categories(id),
    posts_id INTEGER REFERENCES posts(id)
);
