
const db = require('../db/conexion')


function getEquipos(req, res) {
    const sql = `SELECT * FROM EQUIPO`

    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json(err)
        }

        res.json(result)
    })

}

function getEquipoById(req, res) {

    const { id } = req.params

    const sql = `SELECT * FROM EQUIPO WHERE id_equipo = ?`

    db.query(sql, [id], (err, result) => {

        if (err) {
            return res.status(500).json(err)
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: 'Equipo no encontrado'
            })
        }

        res.json(result[0])
    })
}


function createEquipo(req, res) {

    const {nombre, campo} = req.body

    const sql = `INSERT INTO EQUIPO (nombre, campo) VALUES (?, ?)`

    db.query(sql, [nombre, campo], (err, result) => {

        if(err){
            return res.status(500).json(err)
        }

        res.status(201).json({
            message: 'Equipo creado correctamente',
            id: result.insertId
        })
    })
}

function updateEquipo(req, res){

    const {id} = req.params
    const {nombre, campo} = req.body

    const sql = `UPDATE EQUIPO SET nombre = ?, campo = ? WHERE id_equipo = ?`

    db.query(sql, [nombre, campo, id], (err, result) => {

        if(err){
            return res.status(500).json(err)
        }

        if(result.affectedRows === 0){

            return res.status(404).json({
                message: 'Equipo no encontrado'
            })
        }

        res.json({
            message: 'Equipo actualizado correctamente'
        })
    })

}

function deleteEquipo(req, res){

    const {id} = req.params

    const sql = `DELETE FROM EQUIPO WHERE id_equipo = ?`

    db.query(sql, [id], (err, result) => {

        if(err){
            return res.status(500).json(err)
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Equipo no encontrado'
            });
        }

        res.json({
            message: 'Equipo eliminado correctamente'
        })
    })

}

module.exports = { getEquipos, getEquipoById, createEquipo, updateEquipo, deleteEquipo }