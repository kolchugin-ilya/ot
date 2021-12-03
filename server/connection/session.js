const session = require('express-session')
const express = require("express");
const {pool} = require("./pool");
const MySQLStore = require('express-mysql-session')(session);
const ses = express.Router();

const sessionStore = new MySQLStore({
    clearExpired: true,
    expiration: 7200000, // 2 часа
    checkExpirationInterval: 900000, // 15 минут
    createDatabaseTable: false,
    schema: {
        tableName: 'sessions',
        columnNames:{
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
}, pool);

ses.use(session({
    key: 'keyin',
    secret: 'my secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 7200000,
    }
}));

module.exports = ses;
