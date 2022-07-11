CREATE TABLE users(
    id SERIAL PRIMARY KEY ,
    password   TEXT NOT NULL, 
    email  TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN email) > 1) , 
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL
);