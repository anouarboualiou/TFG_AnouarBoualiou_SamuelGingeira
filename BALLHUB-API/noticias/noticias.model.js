const db = require('../db/conexion');

function getAll(callback) {

    const sql = `SELECT * FROM NOTICIA`;

    db.query(sql, callback);
}

function getById(id, callback) {

    const sql = `
        SELECT * FROM NOTICIA
        WHERE id_noticia = ?
    `;

    db.query(sql, [id], callback);
}

function create(data, callback) {

    const sql = `
        INSERT INTO NOTICIA (
            titulo,
            descripcion,
            fecha_pub,
            foto_noticia,
            id_equipo
        )
        VALUES (?, ?, ?, ?, ?)
    `;

     db.query(sql, [data.titulo, data.descripcion, data.fecha_pub, data.foto_noticia, data.id_equipo, id], callback);

}

function update(id, data, callback) {

    const sql = `
        UPDATE NOTICIA
        SET
            titulo = ?,
            descripcion = ?,
            fecha_pub = ?,
            foto_noticia = ?,
            id_equipo = ?
        WHERE id_noticia = ?
    `;

    db.query(sql, [data.titulo, data.descripcion, data.fecha_pub, data.foto_noticia, data.id_equipo, id], callback);
}

function remove(id, callback) {

    const sql = `DELETE FROM NOTICIA WHERE id_noticia = ?`;

    db.query(sql, [id], callback);
}

module.exports = {getAll, getById, create, update, remove};