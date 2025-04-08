const express = require('express');
const router = express.Router();
const provinciaController = require('../controllers/provinciaController');

router.get('/', provinciaController.getProvincias);  // Obtener todas las provincias

module.exports = router;
