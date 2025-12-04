const db = require('../config/db');

exports.getMedicines = (req, res) => {
  db.query(
    "SELECT med_id AS id, name AS name, brand, type AS category, dosage, form, price FROM medicines",
    (err, results) => {
      if (err) {
        console.error('Query error:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(results);
    }
  );
};

exports.getAdmins = exports.getMedicines;