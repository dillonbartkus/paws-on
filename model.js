const db = require('./db/config')

const model = {}

model.findUser = (email, pw) => {
  return db.oneOrNone(
    `
    SELECT * FROM users
    WHERE email = $1
    AND password = $2
    `,
    [email, password]
  )
}

model.createUser = user => {
  return db.one(
    `
     INSERT INTO users
     (email, name, password, city, avatar)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *
    `,
    [user.email, user.name, user.password, user.city,
    user.avatar]
  )
}

model.getFeed = () => {
  return db.query(
    `SELECT * FROM posts`
  )
}

model.getPostInfo = id => {
  return db.one(
    `
    SELECT name, email FROM users
    WHERE id = $1
    `,
    id
  )
}

model.getUserBookmarks = id => {
  return db.query(
    `
    SELECT ARRAY(
    SELECT post_id
    FROM bookmarks
    WHERE user_id = $1)
    `,
    id
  )
}

module.exports = model
