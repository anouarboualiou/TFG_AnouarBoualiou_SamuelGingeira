const express = require('express')
const router = express.Router()

const partidosController = require('./partidos.controller')

const verifyToken = require('../auth/auth.middleware')

router.get('/', partidosController.getPartidos)
router.get('/:id', partidosController.getPartidoById)
router.post('/', verifyToken, partidosController.createPartido)
router.put('/:id', verifyToken, partidosController.updatePartido)
router.delete('/:id', verifyToken, partidosController.deletePartido)


module.exports = router