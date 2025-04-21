require('dotenv').config();
const { Pool } = require('pg');
const fs = require('fs');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  ssl: useSSL
    ? {
        rejectUnauthorized: true,
        ca: fs.readFileSync(path.join(__dirname, 'certs', 'rds-combined-ca-bundle.pem')).toString(),
      }
    : false,
});

module.exports = pool;
