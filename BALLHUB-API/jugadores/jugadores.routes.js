const express = require('express')
const router = express.Router()

const jugadoresController = require('./jugadores.controller')
const verifyToken = require('../middleware/auth.middleware')
const checkRole = require('../middleware/role.middleware')


router.get('/', jugadoresController.getJugadores)
router.get('/:id', jugadoresController.getJugadorById)
router.get('/equipo/:id_equipo', jugadoresController.getJugadoresByEquipo)

router.post('/', verifyToken, checkRole('entrenador'), jugadoresController.createJugador)
router.put('/:id', verifyToken, checkRole('entrenador'),  jugadoresController.updateJugador)
router.delete('/:id', verifyToken, checkRole('entrenador'),  jugadoresController.deleteJugador)


module.exports = router