const jwt = require('jsonwebtoken')

function verifyToken(req, res, next){

    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({
            message: 'Token requerido'
        })
    }

    // Validar formato Bearer
    const parts = authHeader.split(' ')

    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).json({
            message: 'Formato de token inválido'
        })
    }

    const token = parts[1]

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded

        next()

    } catch (error) {

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: 'Token expirado'
            })
        }

        return res.status(401).json({
            message: 'Token inválido'
        })
    }
}

module.exports = verifyToken