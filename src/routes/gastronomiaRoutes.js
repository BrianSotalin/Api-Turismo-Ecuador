const express = require('express');
const router = express.Router();
const gastronomiaController = require('../controllers/gastronomiaController');

router.get('/', gastronomiaController.getGastronomia);         // Obtener todas las características

module.exports = router;
