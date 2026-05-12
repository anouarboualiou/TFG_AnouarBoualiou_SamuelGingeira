const express = require('express');
const router = express.Router();

const entrenamientosController = require('./entrenamientos.controller');
const verifyToken = require('../middleware/auth.middleware');

const checkRole = require('../middleware/role.middleware')

router.get('/', entrenamientosController.getEntrenamientos)
router.get('/:id', entrenamientosController.getEntrenamientoById)

router.post('/', verifyToken, checkRole('entrenador'), entrenamientosController.createEntrenamiento)
router.put('/:id', verifyToken, checkRole('entrenador'), entrenamientosController.updateEntrenamiento)
router.put('/:id/asistencia', verifyToken, checkRole('entrenador'), entrenamientosController.updateAsistencia)
router.delete('/:id', verifyToken, checkRole('entrenador'), entrenamientosController.deleteEntrenamiento)

module.exports = router; 
