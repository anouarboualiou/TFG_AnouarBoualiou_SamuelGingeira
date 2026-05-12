
const express = require('express')
const router = express.Router()

const equiposController = require('./equipos.controller')
const verifyToken = require('../middleware/auth.middleware')
const checkRole = require('../middleware/role.middleware')

router.get('/', equiposController.getEquipos)
router.get('/:id', equiposController.getEquipoById)

router.post('/', verifyToken, checkRole('superadmin'), equiposController.createEquipo)
router.put('/:id', verifyToken, checkRole('superadmin'), equiposController.updateEquipo)
router.delete('/:id', verifyToken, checkRole('superadmin'), equiposController.deleteEquipo)


module.exports = router