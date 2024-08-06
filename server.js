const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// CORS Configuration
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});

// Fetch books by category
app.get('/api/books/:category', (req, res) => {
  const { category } = req.params;
  const query = 'SELECT * FROM books WHERE category = ?';

  db.query(query, [category], (err, results) => {
    if (err) {
      console.error('Error fetching books:', err);
      res.status(500).json({ error: 'Error fetching books' });
      return;
    }
    res.json(results);
  });
});

// Fetch videos by category
app.get('/api/videos/:category', (req, res) => {
  const { category } = req.params;
  const query = 'SELECT * FROM videos WHERE category = ?';

  db.query(query, [category], (err, results) => {
    if (err) {
      console.error('Error fetching videos:', err);
      res.status(500).json({ error: 'Error fetching videos' });
      return;
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
