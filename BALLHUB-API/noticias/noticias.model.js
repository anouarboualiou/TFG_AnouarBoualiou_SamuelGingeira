const db = require('../db/conexion');

function getAll(callback) {

    const sql = `SELECT * FROM NOTICIA`;

    db.query(sql, callback);
}

function getByEquipo(equipo, callback) {

    let sql = `
        SELECT 
            n.id_noticia,
            n.titulo,
            n.descripcion,
            n.fecha_pub,
            n.foto_noticia,
            n.id_equipo,
            e.nombre AS nombre_equipo
        FROM NOTICIA n
        INNER JOIN EQUIPO e
            ON n.id_equipo = e.id_equipo
    `;

    const params = [];

    if (equipo) {

        sql += ` WHERE n.id_equipo = ? `;
        params.push(equipo);

    }

    db.query(sql, params, callback);

}

function getById(id, callback) {

    const sql = `
        SELECT 
            n.*,
            e.nombre AS nombre_equipo
        FROM NOTICIA n
        INNER JOIN EQUIPO e
            ON n.id_equipo = e.id_equipo
        WHERE n.id_noticia = ?
    `;

    db.query(sql, [id], callback);
}

function create(data, callback) {

    const sql = `
        INSERT INTO NOTICIA (
            titulo,
            subtitulo,
            descripcion,
            fecha_pub,
            foto_noticia,
            id_equipo
        )
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(sql, [

        data.titulo,
        data.subtitulo,
        data.descripcion,
        data.fecha_pub,
        data.foto_noticia,
        data.id_equipo

    ], callback);

}

function update(id, data, callback) {

    const sql = `
        UPDATE NOTICIA
        SET
            titulo = ?,
            subtitulo = ?,
            descripcion = ?,
            fecha_pub = ?,
            foto_noticia = ?,
            id_equipo = ?
        WHERE id_noticia = ?
    `;

    db.query(sql, [data.titulo, data.subtitulo, data.descripcion, data.fecha_pub, data.foto_noticia, data.id_equipo, id], callback);
}

function remove(id, callback) {

    const sql = `DELETE FROM NOTICIA WHERE id_noticia = ?`;

    db.query(sql, [id], callback);
}

module.exports = {getAll, getByEquipo,getById, create, update, remove};