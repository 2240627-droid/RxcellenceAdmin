const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',          
  database: 'rxcellence_db'
});

connection.connect(err => {
  if (err) {
    console.error(' Connection failed:', err);
    return;
  }
  console.log(' Connected to MySQL via WAMP');

  connection.query('SELECT NOW() AS ts', (err, results) => {
    if (err) {
      console.error('Query failed:', err);
    } else {
      console.log('DB responded:', results[0].ts);
    }
    connection.end();
  });
});