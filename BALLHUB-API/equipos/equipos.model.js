
const db = require('../db/conexion')

function getAll(callback) {

    const sql = `SELECT 
            e.*,
            en.nombre AS entrenador_nombre,
            en.apellidos AS entrenador_apellidos
            FROM EQUIPO e
            LEFT JOIN ENTRENADOR en 
            ON e.id_equipo = en.id_equipo`

    db.query(sql, callback)
}

function getById(id, callback) {

    const sql = `
        SELECT 
            e.*,
            en.nombre AS entrenador_nombre,
            en.apellidos AS entrenador_apellidos
        FROM EQUIPO e
        LEFT JOIN ENTRENADOR en 
            ON e.id_equipo = en.id_equipo
        WHERE e.id_equipo = ?
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

    const sqlActualizar = `
        UPDATE ENTRENADOR
        SET id_equipo = NULL
        WHERE id_equipo = ?
    `;

    db.query(sqlActualizar, [id], (err) => {

        if (err) {
            return callback(err);
        }

        const sqlBorrar = `
            DELETE FROM EQUIPO
            WHERE id_equipo = ?
        `;

        db.query(sqlBorrar, [id], callback);

    });

}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}