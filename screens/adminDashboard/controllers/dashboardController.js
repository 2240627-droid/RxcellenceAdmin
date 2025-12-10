// filepath: screens/adminDashboard/controllers/dashboardController.js
const dashboardModel = require('../models/dashboardModel');

/**
 * GET /api/logs
 * Returns system log statistics (successful logins, failed attempts, records viewed/updated).
 */
async function getLogs(req, res) {
  try {
    const logs = await dashboardModel.fetchLogs();
    return res.json(logs);
  } catch (err) {
    console.error('Error fetching logs:', err);
    return res.status(500).json({ error: 'Failed to fetch logs' });
  }
}

/**
 * GET /api/alerts
 * Returns security alerts (unauthorized attempts, sensitive file views, etc.).
 */
async function getAlerts(req, res) {
  try {
    const alerts = await dashboardModel.fetchAlerts();
    return res.json(alerts);
  } catch (err) {
    console.error('Error fetching alerts:', err);
    return res.status(500).json({ error: 'Failed to fetch alerts' });
  }
}

/**
 * GET /api/activity
 * Returns activity log entries (timestamp, user, action, details).
 */
async function getActivityLog(req, res) {
  try {
    const activity = await dashboardModel.fetchActivityLog();
    return res.json(activity);
  } catch (err) {
    console.error('Error fetching activity log:', err);
    return res.status(500).json({ error: 'Failed to fetch activity log' });
  }
}

/**
 * GET /api/timestamps
 * Returns recent audit log entries sorted by timestamp.
 */
async function getRecentTimestamps(req, res) {
  try {
    const entries = await dashboardModel.fetchRecentTimestamps();
    return res.json(entries);
  } catch (err) {
    console.error('Error fetching recent timestamps:', err);
    return res.status(500).json({ error: 'Failed to fetch timestamps' });
  }
}


module.exports = {
  getLogs,
  getAlerts,
  getActivityLog,
  getRecentTimestamps
};
