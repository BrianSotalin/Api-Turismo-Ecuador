const pool = require('../config/db');

exports.getGastronomia = async (req, res) => {
  try {
    const result = await pool.query('select gs.*,region.descripcion as region from gastronomia gs INNER JOIN region ON gs.regionid=region.regionid');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener datos' });
  }
};

