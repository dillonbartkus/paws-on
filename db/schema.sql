\c paws

CREATE TABLE IF NOT EXISTS users(
  id BIGSERIAL PRIMARY KEY NOT NULL,
  email VARCHAR(50) NOT NULL UNIQUE,
  name VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(99) NOT NULL,
  zip INTEGER NOT NULL,
  avatar VARCHAR(1000),
  UNIQUE (name, email)
);

CREATE TABLE IF NOT EXISTS posts(
  id SERIAL PRIMARY KEY,
  author_id INTEGER REFERENCES users(id),
  title VARCHAR(40) NOT NULL,
  date_posted VARCHAR(25) NOT NULL,
  address VARCHAR(256) NOT NULL,
  description VARCHAR(1000) NOT NULL,
  picture_one VARCHAR(1000) NOT NULL,
  picture_two VARCHAR(1000),
  picture_three VARCHAR(1000)
);

CREATE TABLE IF NOT EXISTS bookmarks(
  user_id INTEGER REFERENCES users(id),
  post_id INTEGER REFERENCES posts(id),
  PRIMARY KEY(user_id, post_id)
);