const db = require('../db/conexion')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


function login(req, res){

    const {email, password} = req.body 
    
    const sql = `SELECT * FROM USUARIO WHERE email = ?`

    db.query(sql, [email], async (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if(result.length === 0){
            return res.status(401).json({
                message: 'Credenciales incorrectas'
            })
        }

        const usuario = result[0]

        const passwordMatch = await bcrypt.compare(password, usuario.password_hash)

        if(!passwordMatch){
            return res.status(401).json({
                message: 'Credenciales incorrectas'
            })
        }

        const token = jwt.sign(
            {
                id_usuario: usuario.id_usuario,
                rol: usuario.rol
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '8h'
            }
        )

        res.json({
            message: 'Login correcto',
            token
        })
    })

}

function me(req, res){

    res.json({
        user: req.user
    })
}

module.exports = {login, me}
