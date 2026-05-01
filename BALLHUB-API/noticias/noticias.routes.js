const express = require('express');
const router = express.Router();

const noticiasController = require('./noticias.controller');
const verifyToken = require('../middleware/auth.middleware');


router.get('/', noticiasController.getNoticias);
router.get('/:id', noticiasController.getNoticiaById);

router.post('/', verifyToken, noticiasController.createNoticia);
router.put('/:id', verifyToken, noticiasController.updateNoticia);
router.delete('/:id', verifyToken, noticiasController.deleteNoticia);

module.exports = router;