// from .env file
require("dotenv").config()
const mysql = require('mysql');

const pool  = mysql.createPool({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    dateStrings: true
});

module.exports.pool = pool
