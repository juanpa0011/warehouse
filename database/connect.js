const mysql = require('mysql');
const path = 'mysql://root@localhost:3000'; // As long as it is LOCALHOST:3000, it will search there

const DB = mysql.createConnection({
    host: 'localhost', // process.env.HOST,
    user: 'root', // Myself.
    password: '', // Levantar informacion sencible de Variables de Entorno (.ENV)
    database: 'warehouse' // Nombre de la base de Datos
});

// mover estos datos a la .env 

module.exports = DB;