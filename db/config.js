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
    host     : process.env.RDS_HOSTNAME,
    user     : RDS_USERNAME,
    database : RDS_DB_NAME,
    password : RDS_PASSWORD,
    port     : RDS_PORT
  })


module.exports = db;