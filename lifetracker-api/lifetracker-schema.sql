CREATE TABLE users(
    id SERIAL PRIMARY KEY ,
    password   TEXT NOT NULL, 
    email  TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN email) > 1) , 
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL
);

CREATE TABLE exercise(
    id  SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    duration INTEGER NOT NULL,
    category INTEGER NOT NULL,
    user_id  INTEGER,

    FOREIGN KEY (user_id) REFERENCES users(id])



)