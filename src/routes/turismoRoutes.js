const express = require('express');
const router = express.Router();
const turismoController = require('../controllers/turismoController');

router.get('/', turismoController.getTurismo);         // Obtener todos los lugares turísticos
router.get('/:lugaresid', turismoController.getTurismoById);   // Obtener un lugar por ID


module.exports = router;
