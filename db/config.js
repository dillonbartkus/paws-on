const options = {
  query: (e) => {
    console.log(e.query);
  }
};

const pgp = require('pg-promise')(options);

let db;

// if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
//   db = pgp({
//     database: 'paws',
//     port: 5432,
//     host: 'localhost',
//   });
// } else if (process.env.NODE_ENV === 'production') {
  db = pgp({
    host     : 'paws-db.c47j7xajgzkn.us-east-2.rds.amazonaws.com',
    user     : 'postgres',
    database : 'paws',
    password : 'postgres',
    port     : 5432
  })
// }

module.exports = db;