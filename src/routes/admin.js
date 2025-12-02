// src/routes/admin.js
const express = require('express');
const router = express.Router();
const { testDb } = require('../controllers/adminController');

router.get('/test-db', testDb);

module.exports = router;   