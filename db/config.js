const options = {
  query: (e) => {
    console.log(e.query);
  }
};

const pgp = require('pg-promise')(options);

let db;

// db = pgp({
//   database: 'paws',
//   port: 5432,
//   host: 'localhost',
// })

db = pgp({
  host: process.env.RDS_HOSTNAME,
  user: process.env.RDS_USERNAME,
  database: process.env.RDS_DB_NAME,
  password: process.env.RDS_PASSWORD,
  port: process.env.RDS_PORT
})

// psql --host=aa1gyxu85uhf667.c47j7xajgzkn.us-east-2.rds.amazonaws.com --port=5432 --username=dillonbartkus --password --dbname=ebdb

module.exports = db;