require('dotenv').config();
const express = require('express');
const app = express();


app.use(express.json());

// Importar rutas
const aventuraRoutes = require('./routes/aventuraRoutes');
const naturalezaRoutes = require('./routes/naturalezaRoutes');
const gastronomiaRoutes = require('./routes/gastronomiaRoutes');
const turismoRoutes = require('./routes/turismoRoutes');
const provinciaRoutes = require('./routes/provinciaRoutes');

// Usar rutas
app.use('/aventura_tipo', aventuraRoutes);
app.use('/naturaleza_tipo', naturalezaRoutes);
app.use('/gastronomia', gastronomiaRoutes);
app.use('/turismo', turismoRoutes);
app.use('/provincias', provinciaRoutes);

module.exports = app;
