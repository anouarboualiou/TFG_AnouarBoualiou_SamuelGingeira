const db = require('../db/conexion');

function getAll(callback) {

    const sql = `SELECT * FROM ENTRENAMIENTO`;

    db.query(sql, callback);
}

function getById(id, callback) {

    const sql = `
        SELECT * FROM ENTRENAMIENTO
        WHERE id_entrenamiento = ?
    `;

    db.query(sql, [id], callback);
}

function create(data, callback) {

    const sql = `
        INSERT INTO ENTRENAMIENTO (
            tipo,
            fecha,
            tiempo,
            id_equipo
        )
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [
        data.tipo,
        data.fecha,
        data.tiempo,
        data.id_equipo
    ], callback);
}

function update(id, data, callback) {

    const sql = `
        UPDATE ENTRENAMIENTO
        SET
            tipo = ?,
            fecha = ?,
            tiempo = ?,
            id_equipo = ?
        WHERE id_entrenamiento = ?
    `;

    db.query(sql, [
        data.tipo,
        data.fecha,
        data.tiempo,
        data.id_equipo,
        id
    ], callback);
}

function remove(id, callback) {

    const sql = `
        DELETE FROM ENTRENAMIENTO
        WHERE id_entrenamiento = ?
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