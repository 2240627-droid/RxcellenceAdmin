const express = require('express');
const router = express.Router();
const { getAdmins } = require('../controllers/adminController');

// GET /api/admins
router.get('/admins', getAdmins);

module.exports = router;