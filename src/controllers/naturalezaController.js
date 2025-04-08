const pool = require('../config/db');

exports.getNaturaleza = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM naturaleza');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener datos' });
  }
};
