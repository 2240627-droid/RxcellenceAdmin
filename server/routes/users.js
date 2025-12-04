const express = require('express');
const router = express.Router();

/**
 * User Management Routes
 * Placeholder endpoints for CRUD operations on users.
 */

// Base route
router.get('/', (req, res) => {
  res.json({ message: 'Users route working!' });
});

// Example: list all users
router.get('/list', (req, res) => {
  res.json({
    users: [
      { id: 1, name: 'Alice', role: 'Admin' },
      { id: 2, name: 'Bob', role: 'Doctor' }
    ]
  });
});

// Example: add a new user
router.post('/add', (req, res) => {
  const { name, role } = req.body;
  res.json({
    message: 'User added successfully',
    user: { id: Date.now(), name, role }
  });
});

module.exports = router;
