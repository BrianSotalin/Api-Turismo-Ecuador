require('dotenv').config();
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const useSSL = process.env.DB_SSL === 'true';

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  ssl: useSSL
    ? {
        rejectUnauthorized: true,
        ca: fs.readFileSync('/app/rds-combined-ca-bundle.pem').toString(),
      }
    : false,
});

module.exports = pool;
