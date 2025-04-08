const pool = require('../config/db');

exports.getProvincias = async (req, res) => {
  try {
    const result = await pool.query
    ('select p.*,region.descripcion as region FROM provincias p INNER JOIN region ON p.regionid=region.regionid');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener datos' });
  }
};
