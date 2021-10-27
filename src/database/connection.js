//Requires
const mysql = require('mysql');
const {promisify} = require('util');
const {database} = require('./keys');

const pool = mysql.createPool(database);

pool.getConnection((error, connection) => {
     if(error) console.log(`[-] ${error}`);
     if(connection) console.log('[+] Base de datos conectada');
          return connection.release();
})
pool.query = promisify(pool.query);
module.exports=pool
