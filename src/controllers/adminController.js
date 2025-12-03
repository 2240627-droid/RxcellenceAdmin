const db = require('../config/db');

exports.getAdmins = (req, res) => {
  db.query(
    'SELECT admin_id AS id, admin_name AS name FROM admins',
    (err, results) => {
      if (err) {
        console.error('Query error:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(results);
    }
  );
};