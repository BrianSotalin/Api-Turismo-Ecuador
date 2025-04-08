const pool = require('../config/db');

exports.getAventura = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM aventura');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener datos' });
  }
};

