require('dotenv').config();
const { Pool } = require('pg');
const fs = require('fs');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: true, // Establecer en true si usas certificados
    ca: fs.readFileSync('/app/rds-combined-ca-bundle.pem').toString() // Ruta al certificado montado en el contenedor
  }
});

module.exports = pool;
