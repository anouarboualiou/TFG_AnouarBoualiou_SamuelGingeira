const db = require('../db/conexion');

function getAll(callback) {

    const sql = `SELECT * FROM ENTRENADOR`;

    db.query(sql, callback);
}

function getById(id, callback) {

    const sql = `
        SELECT * FROM ENTRENADOR
        WHERE id_entrenador = ?
    `;

    db.query(sql, [id], callback);
}

function create(data, callback) {

    const sql = `
        INSERT INTO ENTRENADOR (
            nombre,
            apellidos,
            fecha_nacim,
            id_equipo,
            foto_perfil
        )
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(sql, [
        data.nombre,
        data.apellidos,
        data.fecha_nacim,
        data.id_equipo,
        data.foto_perfil
    ], callback);
}

function update(id, data, callback) {

    const sql = `
        UPDATE ENTRENADOR
        SET
            nombre = ?,
            apellidos = ?,
            fecha_nacim = ?,
            id_equipo = ?,
            foto_perfil = ?
        WHERE id_entrenador = ?
    `;

    db.query(sql, [
        data.nombre,
        data.apellidos,
        data.fecha_nacim,
        data.id_equipo,
        data.foto_perfil,
        id
    ], callback);
}

function remove(id, callback) {

    const sql = `
        DELETE FROM ENTRENADOR
        WHERE id_entrenador = ?
    `;

    db.query(sql, [id], callback);
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};