// filepath: c:\xampp\htdocs\RxcellenceAdmin\server\routes\admin.js
const express = require('express');
const router = express.Router();

/**
 * Admin-specific Routes
 * Placeholder for admin endpoints.
 */

router.get('/', (req, res) => {
  res.json({ message: 'Admin route working!' });
});

module.exports = router;