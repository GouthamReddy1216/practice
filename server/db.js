const mysql = require('mysql2');
require('dotenv').config(); // Load environment variables from .env

function createConnection() {
  return mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.PORT
  });
}

 function insert_db(term) {
  return new Promise((resolve, reject) => {
    const connection = createConnection();
      console.log("Connected to the database");
      connection.query(
        "INSERT INTO search_terms (term, searched_on) VALUES (?, NOW())", 
        [term], 
        (err, result) => {
          if (err) {            
            connection.end();
            return reject(err); // Handle query errors
          }
          console.log("Search term inserted:", term,result);
          connection.end();
          console.log("conn closed");
          resolve(result);
        }
      );
    });
  }

module.exports = {
  insert_db,
  createConnection
};
