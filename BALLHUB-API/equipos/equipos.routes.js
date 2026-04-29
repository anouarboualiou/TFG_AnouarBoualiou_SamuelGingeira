
const express = require('express')
const router = express.Router()

const equiposController = require('./equipos.controller')
const verifyToken = require('../middleware/auth.middleware')


router.get('/', equiposController.getEquipos)
router.get('/:id', equiposController.getEquipoById)
router.post('/', verifyToken, equiposController.createEquipo)
router.put('/:id', verifyToken, equiposController.updateEquipo)
router.delete('/:id', verifyToken, equiposController.deleteEquipo)


module.exports = router