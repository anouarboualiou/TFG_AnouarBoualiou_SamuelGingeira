const express = require('express')
const router = express.Router()

const jugadoresController = require('./jugadores.controller')
const verifyToken = require('../middleware/auth.middleware')


router.get('/', jugadoresController.getJugadores)
router.get('/:id', jugadoresController.getJugadorById)

router.post('/', verifyToken, jugadoresController.createJugador)
router.put('/:id', verifyToken, jugadoresController.updateJugador)
router.delete('/:id', verifyToken, jugadoresController.deleteJugador)


module.exports = router