// backend/routes/media.js
const express = require('express');
const router = express.Router();
const connection = require('../db');

// Fetch books by category
router.get('/books/:category', (req, res) => {
  const { category } = req.params;
  const query = 'SELECT * FROM books WHERE category = ?';
  
  connection.query(query, [category], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

// Fetch videos by category
router.get('/videos/:category', (req, res) => {
  const { category } = req.params;
  const query = 'SELECT * FROM videos WHERE category = ?';
  
  connection.query(query, [category], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

module.exports = router;
