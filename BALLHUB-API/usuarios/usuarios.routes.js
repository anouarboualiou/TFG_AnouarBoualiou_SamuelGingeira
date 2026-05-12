const express = require('express');
const router = express.Router();

const usuariosController = require('./usuarios.controller');

const verifyToken = require('../middleware/auth.middleware');
const checkRole = require('../middleware/role.middleware');

// CREATE
router.post(
    '/',
    verifyToken,
    checkRole('superadmin'),
    usuariosController.createUsuario
);

// UPDATE
router.put(
    '/:id',
    verifyToken,
    checkRole('superadmin'),
    usuariosController.updateUsuario
);

// DELETE
router.delete(
    '/:id',
    verifyToken,
    checkRole('superadmin'),
    usuariosController.deleteUsuario
);

module.exports = router;