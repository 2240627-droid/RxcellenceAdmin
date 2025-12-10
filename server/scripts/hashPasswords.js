// filepath: server/scripts/hashPasswords.js
require('dotenv').config(); // load .env so DB config works

const db = require('../config/db');   // adjust path if needed
const bcrypt = require('bcrypt');

async function migratePasswords() {
  try {
    // Fetch all admins
    const [admins] = await db.query('SELECT admin_id, password FROM admins');

    for (const admin of admins) {
      // Skip if already hashed (bcrypt hashes start with $2a$ or $2b$)
      if (!admin.password.startsWith('$2')) {
        const hashed = await bcrypt.hash(admin.password, 10);
        await db.query(
          'UPDATE admins SET password = ? WHERE admin_id = ?',
          [hashed, admin.admin_id]
        );
        console.log(`Updated admin ${admin.admin_id}`);
      } else {
        console.log(`Admin ${admin.admin_id} already hashed, skipping`);
      }
    }

    console.log('Password migration complete.');
    process.exit(0);
  } catch (err) {
    console.error('Migration error:', err);
    process.exit(1);
  }
}

migratePasswords();
