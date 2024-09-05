const mysql = require('mysql2');
require('dotenv').config(); // Load environment variables from .env

// Create a pool of connections instead of single connections
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.PORT,
  waitForConnections: true, // Allows waiting for an available connection
  connectionLimit: 10, // Limit the number of connections in the pool
  queueLimit: 0, // Unlimited queue limit
});

function insert_db(term) {
  return new Promise((resolve, reject) => {
    // Get a connection from the pool
    pool.getConnection((err, connection) => {
      if (err) {
        console.error("Error getting a connection from the pool", err);
        return reject(err);
      }

      console.log("Connected to the database");

      // Execute the query
      connection.query(
        "INSERT INTO search_terms (term, searched_on) VALUES (?, NOW())",
        [term],
        (queryErr, result) => {
          // Release the connection back to the pool
          connection.release();

          if (queryErr) {
            console.error("Error executing query", queryErr);
            return reject(queryErr);
          }

          console.log("Search term inserted:", term, result);
          resolve(result);
        }
      );
    });
  });
}

module.exports = {
  insert_db,
};
