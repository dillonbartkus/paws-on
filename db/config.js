const options = {
  query: (e) => {
    console.log(e.query);
  }
};

const pgp = require('pg-promise')(options);
const {host, user, database, password, port} = require('./dbvars')

let db;

  db = pgp({
    database: 'paws',
    port: 5432,
    host: 'localhost',
  })

  // db = pgp({
  //   host     : host,
  //   user     : user,
  //   database : database,
  //   password : password,
  //   port     : port
  // })


module.exports = db;