const options = {
  query: (e) => {
    console.log(e.query);
  }
};

const pgp = require('pg-promise')(options);

let db;

if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
  db = pgp({
    database: 'paws',
    port: 5432,
    host: 'localhost',
  });
} else if (process.env.NODE_ENV === 'production') {
  db = pgp({
    host     : process.env.RDS_HOSTNAME,
    user     : process.env.RDS_USERNAME,
    database : process.env.RDS_DB_NAME,
    password : process.env.RDS_PASSWORD,
    port     : process.env.RDS_PORT
  })
}

module.exports = db;