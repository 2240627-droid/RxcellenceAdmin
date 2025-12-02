const express = require('express');
const adminRoutes = require('./routes/admin');

const app = express();

app.use(express.json());
app.use('/admin', adminRoutes);

app.get('/', (req, res) => {
  res.send('Admin server is running');
});

app.listen(3000, () => {
  console.log('Admin server running on port 3000');
});