const express = require('express');
const path = require('path');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from /public
app.use(express.static(path.join(__dirname, '../public')));

// Explicitly serve admin_standard.html for the /dashboard route
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/admin_standard.html'));
});

// API routes
const systemRoutes = require('./routes/system');
const analyticsRoutes = require('./routes/analytics');
const userRoutes = require('./routes/users');
const medicineRoutes = require('./routes/medicine');
const affiliationRoutes = require('./routes/affiliation');
const adminRoutes = require('./routes/admin');

app.use('/api/system', systemRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/users', userRoutes);
app.use('/api/medicine', medicineRoutes);
app.use('/api/affiliation', affiliationRoutes);
app.use('/api/admin', adminRoutes);

// Health check route
app.get('/api/ping', (req, res) => {
  res.json({ status: 'ok', time: new Date() });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});