const db = require('../db/conexion')

function getAll(callback){

    const sql = 'SELECT * FROM JUGADOR'

    db.query(sql, callback)

}

function getByEquipo(id_equipo, callback) {

    const sql = `

        SELECT
            j.*,
            e.nombre AS nombre_equipo

        FROM JUGADOR j

        LEFT JOIN EQUIPO e
            ON j.id_equipo = e.id_equipo

        WHERE j.id_equipo = ?

    `;

    db.query(sql, [id_equipo], callback);

}

function getById(id, callback){

    const sql = 'SELECT * FROM JUGADOR WHERE id_jugador = ?'

    db.query(sql, [id], callback)

}


function create(data, callback){

    const sql = `
        INSERT INTO JUGADOR(
            nombre,
            apellidos,
            fecha_nacim,
            dorsal,
            posicion,
            foto_perfil,
            id_equipo
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [
        data.nombre,
        data.apellidos,
        data.fecha_nacim,
        data.dorsal,
        data.posicion,
        data.foto_perfil,
        data.id_equipo
    ], callback);

}

function update(id, data, callback){

    const sql = `
        UPDATE JUGADOR 
        SET 
            nombre = ?,
            apellidos = ?,
            fecha_nacim = ?,
            dorsal = ?,
            posicion = ?,
            foto_perfil = ?,
            id_equipo = ?
        WHERE id_jugador = ?
    `;

    db.query(sql, [
        data.nombre,
        data.apellidos,
        data.fecha_nacim,
        data.dorsal,
        data.posicion,
        data.foto_perfil,
        data.id_equipo,
        id
    ], callback);

}

function remove(id, callback){

    const sql = 'DELETE FROM JUGADOR WHERE id_jugador = ?'

    db.query(sql, [id], callback)

}

module.exports = {getAll, getByEquipo, getById, create, update, remove}