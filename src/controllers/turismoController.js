const pool = require('../config/db');

exports.getTurismo = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        tl.turismoid, 
        tl.nombre AS lugar, 
        tl.ubicacion,
        p.nombre as provincia,
        region.descripcion as region,
        tl.pueblo_magico,
        json_agg(
        DISTINCT CASE 
        WHEN at.nombre  IS NOT NULL THEN    jsonb_build_object(
            'nombre', at.nombre,
            'descripcion', at.descripcion
          )
        ELSE null
        END
        ) AS atractivos_turisticos,
                      json_agg(
   DISTINCT   CASE 
        WHEN a.descripcion IS NOT NULL THEN jsonb_build_object('actividad', a.descripcion)
        ELSE null
        END
        ) AS aventura,
                     json_agg(
              DISTINCT   CASE 
        WHEN n.descripcion IS NOT NULL THEN jsonb_build_object('descripcion', n.descripcion)
        ELSE null
      END
        ) AS naturaleza
      FROM 
        turismo_lugares tl
      LEFT JOIN 
        atractivos_turisticos at ON at.turismoid = tl.turismoid
      INNER JOIN provincias p ON tl.provinciasid=p.provinciasid
      INNER JOIN region ON p.regionid=region.regionid
      LEFT JOIN turismo_aventura ta ON tl.turismoid=ta.turismoid
      LEFT JOIN aventura a ON a.aventuraid=ta.aventuraid
      LEFT JOIN turismo_naturaleza tn ON tl.turismoid=tn.turismoid
      LEFT JOIN naturaleza n ON n.naturalezaid=tn.naturalezaid    
      GROUP BY 
        tl.turismoid,
        p.nombre,
        region.descripcion
      ORDER BY
        tl.turismoid  ;
    `);

    // Enviar los resultados como respuesta en formato JSON
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({
      error: 'Error al obtener datos' + error
    });
  }
};

exports.getTurismoById = async (req, res) => {
  const {
    lugaresid
  } = req.params;
  try {
    const result = await pool.query(`
      SELECT 
        tl.turismoid, 
        tl.nombre AS lugar, 
        tl.ubicacion,
        p.nombre as provincia,
        region.descripcion as region,
        tl.pueblo_magico,
        json_agg(
         DISTINCT CASE 
        WHEN at.nombre  IS NOT NULL THEN    jsonb_build_object(
            'nombre', at.nombre,
            'descripcion', at.descripcion
          )
        ELSE null
        END
        ) AS atractivos_turisticos,
              json_agg(
    DISTINCT   CASE 
        WHEN a.descripcion IS NOT NULL THEN jsonb_build_object('actividad', a.descripcion)
        ELSE null
        END
        ) AS aventura,
                     json_agg(
         DISTINCT   CASE 
        WHEN n.descripcion IS NOT NULL THEN jsonb_build_object('descripcion', n.descripcion)
        ELSE null
      END
        ) AS naturaleza
      FROM 
        turismo_lugares tl
      LEFT JOIN 
        atractivos_turisticos at ON at.turismoid = tl.turismoid
      INNER JOIN provincias p ON tl.provinciasid=p.provinciasid
      INNER JOIN region ON p.regionid=region.regionid
      LEFT JOIN turismo_aventura ta ON tl.turismoid=ta.turismoid
      LEFT JOIN aventura a ON a.aventuraid=ta.aventuraid
      LEFT JOIN turismo_naturaleza tn ON tl.turismoid=tn.turismoid
      LEFT JOIN naturaleza n ON n.naturalezaid=tn.naturalezaid   
      WHERE 
        tl.turismoid = $1  -- Filtramos por el lugarid proporcionado
      GROUP BY 
        tl.turismoid,
        p.nombre,
        region.descripcion;
    `, [lugaresid]);

    // Si no se encuentran datos, enviamos un error 404
    if (result.rows.length === 0) {
      return res.status(404).send('Registro no encontrado');
    }

    // Enviar los resultados como respuesta en formato JSON
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({
      error: 'Error al obtener datos'
    });
  }
};