const host = 'paws-db.c47j7xajgzkn.us-east-2.rds.amazonaws.com'
const user = 'postgres'
const database = 'paws'
const password = 'postgres'
const port = 5432

// psql --host=paws-db.c47j7xajgzkn.us-east-2.rds.amazonaws.com --port=5432 --username=postgres --password --dbname=paws 

module.exports = {
    host,
    user,
    database,
    password,
    port
}