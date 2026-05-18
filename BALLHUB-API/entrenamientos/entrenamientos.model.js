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
            titulo,
            tipo,
            fecha,
            hora_entreno,
            tiempo,
            descripcion,
            asistentes,
            estado,
            id_equipo
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [

        data.titulo,
        data.tipo,
        data.fecha,
        data.hora_entreno,
        data.tiempo,
        data.descripcion,
        null,
        'pendiente',
        data.id_equipo

    ], callback);
}

function update(id, data, callback) {

    const sql = `
        UPDATE ENTRENAMIENTO
        SET
            titulo = ?,
            tipo = ?,
            descripcion = ?,
            fecha = ?,
            hora_entreno = ?,
            tiempo = ?,
            id_equipo = ?
        WHERE id_entrenamiento = ?
    `;

    db.query(sql, [

        data.titulo,
        data.tipo,
        data.descripcion,
        data.fecha,
        data.hora_entreno,
        data.tiempo,
        data.id_equipo,
        id

    ], callback);
}

function updateAsistencia(id, data, callback) {

    const sql = `
        UPDATE ENTRENAMIENTO
        SET
            asistentes = ?,
            estado = 'finalizado'
        WHERE id_entrenamiento = ?
    `;

    db.query(sql, [
        data.asistentes,
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
    updateAsistencia,
    remove
};