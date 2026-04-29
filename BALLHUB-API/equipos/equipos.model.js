
const db = require('../db/conexion')

function getAll(callback) {

    const sql = 'SELECT * FROM EQUIPO'

    db.query(sql, callback)
}

function getById(id, callback) {

    const sql = `
        SELECT * FROM EQUIPO
        WHERE id_equipo = ?
    `;

    db.query(sql, [id], callback);
}

function create(data, callback) {

    const sql = `
        INSERT INTO EQUIPO (nombre, campo)
        VALUES (?, ?)
    `;

    db.query(sql, [
        data.nombre,
        data.campo
    ], callback);
}

function update(id, data, callback) {

    const sql = `
        UPDATE EQUIPO
        SET nombre = ?, campo = ?
        WHERE id_equipo = ?
    `;

    db.query(sql, [
        data.nombre,
        data.campo,
        id
    ], callback);
}

function remove(id, callback) {

    const sql = `
        DELETE FROM EQUIPO
        WHERE id_equipo = ?
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