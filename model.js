const db = require('./db/config')

const model = {}

model.findUser = email => {
  return db.oneOrNone(
    `
    SELECT * FROM users
    WHERE email = $1
    `,
    [email]
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
    `
    SELECT posts.*, users.name, users.email
    FROM users
    INNER JOIN posts on users.id = posts.author_id
    `
  )
}

model.getMyPosts = id => {
  return db.query(
    `
    SELECT posts.*, users.name, users.email
    FROM users
    INNER JOIN posts on users.id = posts.author_id
    WHERE author_id = $1
    `,
    id
  )
}

model.getPostInfo = id => {
  return db.one(
    `
    SELECT posts.*, users.name, users.email
    FROM users
    INNER JOIN posts on users.id = posts.author_id
    WHERE posts.id = $1
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

model.addBookmark = (post_id, user_id) => {
  return db.one(
    `
    INSERT INTO bookmarks
    (post_id, user_id)
    VALUES ($1, $2)
    RETURNING *
    `,
    [post_id, user_id]
  )
}

model.removeBookmark = (post_id, user_id) => {
  return db.none(
    `
    DELETE FROM bookmarks
    WHERE post_id = $1 AND user_id = $2
    `,
    [post_id, user_id]
  )
}

module.exports = model
