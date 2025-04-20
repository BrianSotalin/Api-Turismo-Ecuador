require('dotenv').config();

console.log('📦 Variables de entorno cargadas:\n');

const keys = ['DB_USER', 'DB_HOST', 'DB_NAME', 'DB_PASS', 'DB_PORT'];

keys.forEach((key) => {
  console.log(`${key} = ${process.env[key] || '[NO DEFINIDA]'}`);
});
