const mysql = require('mysql');
const path = 'mysql://root@localhost:3000'; // As long as it is LOCALHOST:3000, it will search there

require('dotenv').config();

const DB = mysql.createConnection({ 
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD, 
    database:  process.env.DB_NAME 
});

// mover estos datos a la .env 

module.exports = DB;