const express = require('express');
const router = express.Router();
const aventuraController = require('../controllers/aventuraController');

router.get('/', aventuraController.getAventura);         // Obtener todas las características

module.exports = router;
