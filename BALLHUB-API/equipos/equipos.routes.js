
const express = require('express')
const router = express.Router()

const equiposController = require('./equipos.controller')

router.get('/', equiposController.getEquipos)


module.exports = router