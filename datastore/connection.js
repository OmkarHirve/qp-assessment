const { Sequelize } = require('sequelize');
const mysql = require("mysql2/promise");
const constants = require('../config/constants');

const sequelize = new Sequelize({
  database: constants.DATABASE,
  host: constants.DB_HOST,
  dialect: "mysql",
  password: constants.DB_PASSWORD,
  port: 3306,
  username: constants.DB_USER,
});

async function dbConnect() {
    try {
        await sequelize.authenticate();
        console.log('Connection to MySQL has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the MySQL:', error);
        throw new Error("Error connecting to database")
    }
}

module.exports.sequelize = sequelize;
module.exports.dbConnect = dbConnect;

