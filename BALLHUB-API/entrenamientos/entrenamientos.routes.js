const express = require('express');
const router = express.Router();

const entrenamientosController = require('./entrenamientos.controller');
const verifyToken = require('../middleware/auth.middleware');

router.get('/', entrenamientosController.getEntrenamientos);
router.get('/:id', entrenamientosController.getEntrenamientoById);

router.post('/', verifyToken, entrenamientosController.createEntrenamiento);
router.put('/:id', verifyToken, entrenamientosController.updateEntrenamiento);
router.delete('/:id', verifyToken, entrenamientosController.deleteEntrenamiento);

module.exports = router;