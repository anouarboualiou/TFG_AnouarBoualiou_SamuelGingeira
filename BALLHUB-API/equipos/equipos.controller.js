
const db = require('../db/conexion')


function getEquipos(req, res){
    const sql = `SELECT * FROM EQUIPO`

    db.query(sql, (err, result) => {
        if(err){
            return res.status(500).json(err)
        }

        res.json(result)
    })

}

module.exports = {getEquipos}