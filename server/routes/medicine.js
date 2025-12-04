const express = require('express');
const router = express.Router();

/**
 * Medicine Master List Routes
 * Placeholder for medicine management endpoints.
 */

router.get('/', (req, res) => {
  res.json({ message: 'Medicine route working!' });
});

module.exports = router;