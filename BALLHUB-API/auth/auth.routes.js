const express = require('express');
const router = express.Router();

const authController = require('./auth.controller');
const verifyToken = require('../middleware/auth.middleware');

//Login 
router.post('/login', authController.login);

//Obtener usuario autenticado
router.get('/me', verifyToken, authController.me);

//logout
router.post('/logout', verifyToken, (req, res) => {
    res.json({ message: 'Logout correcto' });
});

module.exports = router;