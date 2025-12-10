// filepath: screens/auth/controllers/authController.js
const { findByName } = require('../models/adminModel');

// Track failed attempts and warnings in memory
const failedAttempts = {};
const warnings = {};

/**
 * POST /auth/login
 * Handles admin login with plaintext password check,
 * failed attempt tracking, session creation, and redirect to dashboard.
 */
const login = async (req, res) => {
  const { admin_name, password } = req.body;
  console.log('Login attempt:', admin_name);

  try {
    const admin = await findByName(admin_name);
    console.log('DB result:', admin);

    if (!admin) {
      return handleFailure(admin_name, res, 'Invalid credentials: user not found');
    }

    // Plaintext comparison
    const passwordMatch = (password === admin.password);

    if (!passwordMatch) {
      return handleFailure(admin_name, res, 'Invalid credentials: wrong password');
    }

  
    failedAttempts[admin_name] = 0;
    console.log(`Login successful for "${admin_name}"`);

    if (!req.session) {
      console.error('Session is undefined — middleware may not be applied correctly');
      return res.status(500).send('Session error');
    }

    req.session.admin = {
      id: admin.admin_id,
      name: admin.admin_name,
      role: 'admin'
    };

    return res.redirect('/dashboard.html');
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).send('Server error');
  }
};

function handleFailure(admin_name, res, message) {
  failedAttempts[admin_name] = (failedAttempts[admin_name] || 0) + 1;

  if (failedAttempts[admin_name] >= 3) {
    warnings[admin_name] = (warnings[admin_name] || 0) + 1;
    console.warn(
      `Warning issued for "${admin_name}" after 3 failed attempts. Total warnings: ${warnings[admin_name]}`
    );
    failedAttempts[admin_name] = 0;
    return res
      .status(403)
      .send(`Warning: Too many failed attempts (Warnings: ${warnings[admin_name]})`);
  }

  console.warn(`Login failed for "${admin_name}" (${failedAttempts[admin_name]} attempt(s))`);
  return res.status(401).send(message);
}

const logout = (req, res) => {
  if (!req.session) {
    console.error('No session found during logout');
    return res.redirect('/login');
  }

  req.session.destroy(err => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).send('Error logging out');
    }
    res.redirect('/login');
  });
};

module.exports = { login, logout };
