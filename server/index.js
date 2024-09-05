require('dotenv').config(); // Load environment variables from .env

const{insert_db}=require('./db')
const express = require('express');
const mysql=require('mysql2')
const path = require('path');

const app = express();
const API_URL = process.env.API_KEY;
const port = process.env.EXP_PORT;

// Serve static files from the React app's build directory
app.use(express.static(path.join(__dirname,'..','build')));

// API endpoint for fetching movies
app.get('/search', async (req, res) => {      
    try {

        const title=req.query.title;

        if(title.length>0)
        {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        res.send(data);
        const dbres=await insert_db(title);
        }
        } 
        catch (error) {
        console.error('Error during API or DB operation:', error);
            if (!res.headersSent) {
                res.status(500).json({ error: 'Error fetching data or inserting into database' });
            }
    }
});

// Catch-all handler for any request that doesn't match the above routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,'..','build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
