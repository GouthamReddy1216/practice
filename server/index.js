require('dotenv').config(); // Load environment variables from .env

const{insert_db}=require('./db')
const express = require('express');
const mysql=require('mysql2')
const path = require('path');

const app = express();
const API_URL = process.env.API_KEY;
const port = 3000;

// Serve static files from the React app's build directory
app.use(express.static(path.join(__dirname,'..','build')));

// API endpoint for fetching movies
app.get('/search', async (req, res) => {
    try {
        // Fetch movies from OMDB API
        const title=req.query.title;       
        insert_db(title);

        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
    
        // Insert search term into the database
        console.log(`Search term '${title}' inserted into the database`);
    
        // Send back the movie data as a response
        res.send(data);
      }
       catch (error) {
            console.error('Error during API or DB operation:', error);
            res.status(500).json({ error: 'Error fetching data or inserting into database' });
        }
});

// Catch-all handler for any request that doesn't match the above routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,'..','build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
