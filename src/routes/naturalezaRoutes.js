const express = require('express');
const router = express.Router();
const naturalezaController = require('../controllers/naturalezaController');

router.get('/', naturalezaController.getNaturaleza);


module.exports = router;
