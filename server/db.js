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

async function insert_db(term) {
  return new Promise((resolve, reject) => {
    const connection = createConnection();
    
    connection.connect((err) => {
      if (err) {
        return reject(err); // Handle connection errors
      }
      console.log("Connected to the database");

      connection.query(
        "INSERT INTO search_terms (term, searched_on) VALUES (?, NOW())", 
        [term], 
        (err, result) => {
          if (err) {
            connection.end(); // Close the connection if there's an error
            return reject(err); // Handle query errors
          }
          console.log("Search term inserted:", result);

          connection.end((endErr) => {
            if (endErr) {
              return reject(endErr); // Handle errors closing the connection
            }
            console.log("Connection closed");
            resolve(result); // Resolve the promise with the result
          });
        }
      );
    });
  })
}

module.exports = {
  insert_db
};
