// filepath: screens/adminDashboard/models/dashboardModel.js
const db = require('../../../server/config/db');

/**
 * Fetch system logs
 */
async function fetchLogs() {
  const query = `
    SELECT log_id, user_id, user_type, action, target_id, timestamp, details
    FROM audit_logs
    WHERE action IN ('login_success', 'login_failed', 'record_viewed', 'record_updated')
    ORDER BY timestamp DESC
    LIMIT 10
  `;
  try {
    const [rows] = await db.query(query);
    if (!rows || rows.length === 0) return [];
    return rows.map(row => ({
      message: `${row.user_type} ${row.action} at ${new Date(row.timestamp).toLocaleString()}`
    }));
  } catch (err) {
    console.error('Error fetching logs:', err);
    throw err;
  }
}

/**
 * Fetch security alerts
 */
async function fetchAlerts() {
  const query = `
    SELECT log_id, user_id, user_type, action, target_id, timestamp, details
    FROM audit_logs
    WHERE action IN ('unauthorized_export', 'sensitive_file_viewed', 'unauthorized_access')
    ORDER BY timestamp DESC
    LIMIT 10
  `;
  try {
    const [rows] = await db.query(query);
    if (!rows || rows.length === 0) return [];
    return rows.map(row => ({
      message: `${row.action} by ${row.user_type} at ${new Date(row.timestamp).toLocaleString()}`
    }));
  } catch (err) {
    console.error('Error fetching alerts:', err);
    throw err;
  }
}

/**
 * Fetch activity log
 */
async function fetchActivityLog(limit = 15) {
  const query = `
    SELECT log_id, user_id, user_type, action, target_id, timestamp, details
    FROM audit_logs
    ORDER BY timestamp DESC
    LIMIT ?
  `;
  try {
    const [rows] = await db.query(query, [limit]);
    if (!rows || rows.length === 0) return [];
    return rows.map(row => ({
      timestamp: row.timestamp,
      user_type: row.user_type,
      action: row.action,
      details: row.details
    }));
  } catch (err) {
    console.error('Error fetching activity log:', err);
    throw err;
  }
}

/**
 * Fetch recent timestamps
 */
async function fetchRecentTimestamps(limit = 10) {
  const query = `
    SELECT log_id, user_id, user_type, action, target_id, timestamp, details
    FROM audit_logs
    ORDER BY timestamp DESC
    LIMIT ?
  `;
  try {
    const [rows] = await db.query(query, [limit]);
    return rows || [];
  } catch (err) {
    console.error('Error fetching timestamps:', err);
    throw err;
  }
}

module.exports = {
  fetchLogs,
  fetchAlerts,
  fetchActivityLog,
  fetchRecentTimestamps
};
