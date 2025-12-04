const express = require('express');
const router = express.Router();

/**
 * System Monitoring Routes
 * These are placeholders you can expand later with DB queries or logic.
 */

// Health check
router.get('/', (req, res) => {
  res.json({ message: 'System Monitoring route working!' });
});

// Example: uptime stats
router.get('/uptime', (req, res) => {
  res.json({ uptime: process.uptime() });
});

// Example: server info
router.get('/info', (req, res) => {
  res.json({
    nodeVersion: process.version,
    platform: process.platform,
    memoryUsage: process.memoryUsage()
  });
});

// Example: get system logs
router.get('/logs', (req, res) => {
  // In a real app, you would fetch this from a database or log file
  const logs = [
    { timestamp: '2025-01-14 08:32:45', user: 'Patient', action: 'Updated profile', details: 'Viewed prescription record for Paracetamol' },
    { timestamp: '2025-02-27 19:11:03', user: 'Doctor', action: 'Added a patient', details: 'Added new patient record linked to prescription' },
    { timestamp: '2025-03-09 09:47:29', user: 'Pharmacist', action: 'Added a new medicine branch', details: 'Registered new branch inventory with Amoxicillin' },
    { timestamp: '2025-04-22 14:05:58', user: 'Admin', action: 'Approved an affiliation', details: 'Approved pharmacy affiliation request' },
    { timestamp: '2025-06-10 23:58:12', user: 'Pharmacist', action: 'Added a new medicine batch', details: 'Created branch entry with Salbutamol' },
  ];
  res.json(logs);
});

// Example: get security alerts
router.get('/alerts', (req, res) => {
  // In a real app, this would come from a security monitoring service or database
  const alerts = [
    { id: 1, message: 'Unauthorized data export attempt', level: 'high' },
    { id: 2, message: 'New account registered', level: 'info' },
    { id: 3, message: 'Data export completed successfully', level: 'info' },
    { id: 4, message: 'Sensitive file viewed', level: 'medium' },
    { id: 5, message: 'Unauthorized data export attempt', level: 'high' }
  ];
  res.json(alerts);
});

module.exports = router;
