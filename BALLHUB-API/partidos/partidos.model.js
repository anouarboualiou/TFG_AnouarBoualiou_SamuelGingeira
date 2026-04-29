const db = require('../db/conexion')

function getAll(callback) {

    const sql = `SELECT * FROM PARTIDO`;

    db.query(sql, callback);
}

function getById(id, callback) {

    const sql = `
        SELECT * FROM PARTIDO
        WHERE id_partido = ?
    `;

    db.query(sql, [id], callback);
}

function create(data, callback) {

    const sql = `
        INSERT INTO PARTIDO (
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
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [
        data.fecha_part,
        data.rival_campo,
        data.rival_nombre,
        data.goles_contra,
        data.goles_favor,
        data.esLocal,
        data.estado,
        data.temporada,
        data.foto_campo,
        data.id_equipo
    ], callback);
}

function update(id, data, callback) {

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
        data.fecha_part,
        data.rival_campo,
        data.rival_nombre,
        data.goles_contra,
        data.goles_favor,
        data.esLocal,
        data.estado,
        data.temporada,
        data.foto_campo,
        id
    ], callback);
}

function remove(id, callback) {

    const sql = `
        DELETE FROM PARTIDO
        WHERE id_partido = ?
    `;

    db.query(sql, [id], callback);
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}