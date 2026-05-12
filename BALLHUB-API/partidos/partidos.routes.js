const express = require('express')
const router = express.Router()

const partidosController = require('./partidos.controller')
const verifyToken = require('../middleware/auth.middleware')
const checkRole = require('../middleware/role.middleware')


router.get('/', partidosController.getPartidos)
router.get('/:id', partidosController.getPartidoById)

router.post('/', verifyToken, checkRole('entrenador'), partidosController.createPartido)
router.put('/:id', verifyToken, checkRole('entrenador'), partidosController.updatePartido)
router.put('/:id/resultado', verifyToken, checkRole('entrenador'), partidosController.updateResultado)
router.delete('/:id', verifyToken, checkRole('entrenador'),partidosController.deletePartido)


module.exports = router