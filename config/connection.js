const Sequelize = require("sequelize");

var sequelize = new Sequelize("pubtrivia", "root", "Emrys1960!", {
    host: "localhost",
    port: 3306,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

// Exports the connection for other files to use
module.exports = sequelize;
