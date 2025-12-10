// server/app.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const authRoutes = require('../screens/auth/routes/auth');

const app = express();

// Middleware for parsing form and JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Everything inside /public is accessible directly at /
// Example: /style.css, /dashboard.css, /dashboard.html
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../login.html'));
});

app.use('/auth', authRoutes);

app.use((req, res) => {
  res.status(404).send('Page not found');
});

app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).send('Internal server error');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
