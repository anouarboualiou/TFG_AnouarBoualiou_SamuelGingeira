

function checkRole(role){

    return (req, res, next) => {

        if(req.user.rol !== role){
            return res.status(403).json({
                message: 'No autorizado'
            })
        }

        next()
    }
}


module.exports = checkRole