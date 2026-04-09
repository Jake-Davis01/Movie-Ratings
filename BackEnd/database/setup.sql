DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS users;

CREATE TABLE users(
  user_id INT GENERATED ALWAYS AS IDENTITY,
  email TEXT,
  password TEXT,
  security_question TEXT,
  security_answer TEXT,
  username TEXT,
  name TEXT,
  PRIMARY KEY(user_id)
);

CREATE TABLE reviews(
  review_table_id INT GENERATED ALWAYS AS IDENTITY,
  user_id INT REFERENCES users(user_id),
  name TEXT,
  album TEXT,
  year INT,
  rating INT,
  score1 NUMERIC(3,1),
  score2 NUMERIC(3,1),
  image TEXT,
  PRIMARY KEY (review_table_id)
);