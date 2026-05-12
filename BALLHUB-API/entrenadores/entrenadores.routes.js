const express = require('express');
const router = express.Router();

const entrenadoresController = require('./entrenadores.controller');
const verifyToken = require('../middleware/auth.middleware');
const checkRole = require('../middleware/role.middleware');

router.get(
    '/',
    verifyToken,
    checkRole('superadmin'),
    entrenadoresController.getEntrenadores
);

router.get(
    '/:id',
    verifyToken,
    checkRole('superadmin'),
    entrenadoresController.getEntrenadorById
);


router.post(
    '/',
    verifyToken,
    checkRole('superadmin'),
    entrenadoresController.createEntrenador
);

router.post(
    '/full',
    verifyToken,
    checkRole('superadmin'),
    entrenadoresController.createEntrenadorFull
);

router.put(
    '/:id',
    verifyToken,
    checkRole('superadmin'),
    entrenadoresController.updateEntrenador
);

router.delete(
    '/:id',
    verifyToken,
    checkRole('superadmin'),
    entrenadoresController.deleteEntrenador
);

module.exports = router;