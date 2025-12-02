const pool = require('../config/db');

exports.testDb = async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json(result.rows);
  } catch (err) {
    console.error('DB connection error:', err);
    res.status(500).send('DB error');
  }
};