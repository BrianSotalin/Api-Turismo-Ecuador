require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

client.connect()
  .then(() => {
    console.log('Conexión a RDS exitosa');
    return client.end();
  })
  .catch(err => {
    console.error('Falló la conexión a RDS:', err.message);
    console.error('Código de error:', err.code);
  });
