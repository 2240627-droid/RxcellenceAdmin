const express = require('express');
const router = express.Router();
const { getMedicines } = require('../controllers/adminController');

// GET /api/medicines
router.get('/medicines', getMedicines);

// Backwards-compatible admin route (points to the same medicines handler)
router.get('/admins', getMedicines);

module.exports = router;