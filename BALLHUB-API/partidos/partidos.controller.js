const db = require('../db/conexion')

function getPartidos(req, res){

    const sql = `SELECT * FROM PARTIDO`

    db.query(sql, (err, result) => {

        if(err){
            return res.status(500).json(err)
        }

        res.json(result)
    })
}

function getPartidoById(req, res){

    const {id} = req.params

    const sql = `SELECT * FROM PARTIDO WHERE id_partido = ?`

    db.query(sql, [id], (err, result) => {

        if(err){
            return res.status(500).json(err)
        }

        if(result.length === 0){
            return res.status(404).json({
                message: 'Partido no encontrado'
            })
        }

        res.json(result[0])

    })
}


function createPartido(req, res){

    const {
        fecha_part,
        rival_campo,
        rival_nombre,
        goles_contra,
        goles_favor,
        esLocal,
        estado,
        temporada,
        foto_campo,
        id_equipo
    } = req.body;

    const sql = `INSERT INTO PARTIDO (
        fecha_part,
        rival_campo,
        rival_nombre,
        goles_contra,
        goles_favor,
        esLocal,
        estado,
        temporada,
        foto_campo,
        id_equipo
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

    db.query(sql, [
        fecha_part,
        rival_campo,
        rival_nombre,
        goles_contra,
        goles_favor,
        esLocal,
        estado,
        temporada,
        foto_campo,
        id_equipo
    ], (err, result) => {


        if(err){
            return res.status(500).json(err)
        }

        res.status(201).json({
            message:'Partido creado',
            id: result.insertId
        })
    })
}

function updatePartido(req, res){

    const {id} = req.params

    const {
        fecha_part,
        rival_campo,
        rival_nombre,
        goles_contra,
        goles_favor,
        esLocal,
        estado,
        temporada,
        foto_campo
    } = req.body;

    const sql = `
        UPDATE PARTIDO
        SET
            fecha_part = ?,
            rival_campo = ?,
            rival_nombre = ?,
            goles_contra = ?,
            goles_favor = ?,
            esLocal = ?,
            estado = ?,
            temporada = ?,
            foto_campo = ?
        WHERE id_partido = ?
    `;

    db.query(sql, [
        fecha_part,
        rival_campo,
        rival_nombre,
        goles_contra,
        goles_favor,
        esLocal,
        estado,
        temporada,
        foto_campo,
        id
    ], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: 'Partido actualizado'
        });
    });
}

function deletePartido(req, res){

    const {id} = req.params

    const sql = `DELETE FROM PARTIDO WHERE id_partido = ?`

    db.query(sql, [id], (err, result) => {

        if(err){
            return res.status(500).json(err)
        }

        res.json({
            message:'Partido eliminado'
        })
    })
}


module.exports = {getPartidos, getPartidoById, createPartido, updatePartido, deletePartido}