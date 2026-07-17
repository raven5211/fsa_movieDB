-- In development and testing environments, it is useful to drop and recreate
-- tables to ensure a "fresh" start. This is not something we want to be doing in
-- production!
DROP TABLE IF EXISTS movies;

CREATE TABLE movies(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE, 
    release_date DATE NOT NULL,
    running_time INTEGER NOT NULL
);
