const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');  // إضافة هذه السطر

dotenv.config();

const app = express();
const port = 3001;

// Middleware
app.use(cors());  // تمكين CORS لكل المصادر
app.use(express.json());
app.use(express.static('dist'));

// API route
app.get('/key', (req, res) => {
  res.json({ key: process.env.API_KEY });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
