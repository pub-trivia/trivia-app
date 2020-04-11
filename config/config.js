require("dotenv").config();

module.exports =
{
  "development": {
    "username": "root",
    "password": process.env.DB_PASS,
    "database": "pubtrivia",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "production": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.JAWSDB_URL,
    "host": process.env.DB_HOST,
    "dialect": "mysql"
  }
}