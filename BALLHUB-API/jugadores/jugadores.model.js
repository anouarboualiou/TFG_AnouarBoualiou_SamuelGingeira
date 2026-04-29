const db = require('../db/conexion')

function getAll(callback){

    const sql = 'SELECT * FROM JUGADOR'

    db.query(sql, callback)

}

function getById(id, callback){

    const sql = 'SELECT * FROM JUGADOR WHERE id_jugador = ?'

    db.query(sql, [id], callback)

}


function create(data, callback){

    const sql = `INSERT INTO JUGADOR(nombre, fecha_nacim, apellidos, id_equipo)
                VALUES (?, ?, ?, ?)`

    db.query(sql, [data.nombre, data.apellidos, data.fecha_nacim, data.id_equipo], callback)
}

function update(id, data, callback){

    const sql = `UPDATE JUGADOR SET nombre = ?, fecha_nacim = ?, apellidos = ?, id_equipo = ?
                WHERE id_jugador = ?`

    db.query(sql, [data.nombre, data.apellidos, data.fecha_nacim, data.id_equipo, id], callback)
}

function remove(id, callback){

    const sql = 'DELETE FROM JUGADOR WHERE id_jugador = ?'

    db.query(sql, [id], callback)

}

module.exports = {getAll, getById, create, update, remove}