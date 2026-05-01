const express = require('express');
const router = express.Router();

const entrenadoresController = require('./entrenadores.controller');
const verifyToken = require('../middleware/auth.middleware');

router.get('/', entrenadoresController.getEntrenadores);
router.get('/:id', entrenadoresController.getEntrenadorById);

router.post('/', verifyToken, entrenadoresController.createEntrenador);
router.put('/:id', verifyToken, entrenadoresController.updateEntrenador);
router.delete('/:id', verifyToken, entrenadoresController.deleteEntrenador);

module.exports = router;