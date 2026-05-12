const express = require('express');
const router = express.Router();

const noticiasController = require('./noticias.controller');
const verifyToken = require('../middleware/auth.middleware');
const checkRole = require('../middleware/role.middleware');


router.get('/', noticiasController.getNoticias);
router.get('/:id', noticiasController.getNoticiaById);

router.post('/', verifyToken, checkRole('entrenador'), noticiasController.createNoticia);
router.put('/:id', verifyToken, checkRole('entrenador'), noticiasController.updateNoticia);
router.delete('/:id', verifyToken, checkRole('entrenador'), noticiasController.deleteNoticia);

module.exports = router;