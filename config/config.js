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
    "username": process.env.MYSQL_USER,
    "password": process.env.MYSQL_PASSWORD,
    "database": process.env.MYSQL_DATABASE,
    "host": process.env.MYSQL_HOST,
    "dialect": "mysql"
  }
}