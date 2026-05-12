const authModel = require('./auth.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function login(req, res){

    const { email, password } = req.body 
    
    authModel.getUserByEmail(email, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (result.length === 0) {
            return res.status(401).json({
                message: 'Credenciales incorrectas'
            })
        }

        const usuario = result[0];

        bcrypt.compare(password, usuario.password_hash, (err, match) => {

            if (err) {
                return res.status(500).json(err);
            }

            if (!match) {
                return res.status(401).json({
                    message: 'Credenciales incorrectas'
                })
            }

            const token = jwt.sign(
                {
                    id_usuario: usuario.id_usuario,
                    rol: usuario.rol,
                    id_entrenador: usuario.id_entrenador,
                    id_equipo: usuario.id_equipo
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '8h'
                }
            )

            res.json({
                message: 'Login correcto',
                token,
                user: {
                    id_usuario: usuario.id_usuario,
                    email: usuario.email,
                    rol: usuario.rol,
                    id_entrenador: usuario.id_entrenador,
                    id_equipo: usuario.id_equipo,

                    nombre: usuario.nombre,
                    apellidos: usuario.apellidos,
                    foto_perfil: usuario.foto_perfil,
                    nombre_equipo: usuario.nombre_equipo,
                    campo: usuario.campo
                }
            })
        })
    })
}

function me(req, res){

    if (!req.user) {
        return res.status(401).json({
            message: 'No autenticado'
        })
    }

    res.json({
        user: req.user
    })
}

module.exports = { login, me }