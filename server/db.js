const mysql = require('mysql2');
require('dotenv').config(); // Load environment variables from .env

// Function to create a single connection
function createConnection() {
  return mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.PORT,
    enableKeepAlive: true, // Keep the connection alive
    keepAliveInitialDelay: 10000, // Set an initial delay for keep-alive
  });
}

function insert_db(term) {
  return new Promise((resolve, reject) => {
    const connection = createConnection();

    // Ensure connection is established
    connection.connect((err) => {
      if (err) {
        console.error("Error connecting to the database:", err);
        return reject(err);
      }

      console.log("Connected to the database");

      // Perform the query
      connection.query(
        "INSERT INTO search_terms (term, searched_on) VALUES (?, NOW())",
        [term],
        (queryErr, result) => {
          if (queryErr) {
            console.error("Error executing query:", queryErr);
            connection.end(); // Close connection on query error
            return reject(queryErr);
          }

          console.log("Search term inserted:", term, result);
          connection.end((closeErr) => {
            if (closeErr) {
              console.error("Error closing the connection:", closeErr);
              return reject(closeErr);
            }
            console.log("Connection closed");
            resolve(result);
          });
        }
      );
    });
  });
}

module.exports = {
  insert_db,
  createConnection
};
