const db = require('../db/conexion')

function getAll(callback) {

    const sql = `SELECT * FROM PARTIDO`;

    db.query(sql, callback);
}

function getByFiltros(equipo, estado, callback) {

    let sql = `
        SELECT 
            p.*,
            e.nombre AS nombre_equipo,
            e.campo AS campo_equipo
        FROM PARTIDO p
        INNER JOIN EQUIPO e
            ON p.id_equipo = e.id_equipo
    `;

    const params = [];

    const condiciones = [];



    if (equipo) {

        condiciones.push(`p.id_equipo = ?`);
        params.push(equipo);

    }



    if (estado) {

        condiciones.push(`p.estado = ?`);
        params.push(estado);

    }



    if (condiciones.length > 0) {

        sql += ` WHERE ` + condiciones.join(' AND ');

    }



    db.query(sql, params, callback);

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
            hora_part,
            rival_campo,
            rival_nombre,
            esLocal,
            estado,
            temporada,
            foto_campo,
            id_equipo
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [
        data.fecha_part,
        data.hora_part,
        data.rival_campo,
        data.rival_nombre,
        data.esLocal,

        'pendiente',

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
            hora_part = ?,
            rival_campo = ?,
            rival_nombre = ?,
            goles_contra = ?,
            goles_favor = ?,
            esLocal = ?,
            estado = ?,
            temporada = ?,
            foto_campo = ?,
            id_equipo = ?
        WHERE id_partido = ?
    `;

    db.query(sql, [

        data.fecha_part,
        data.hora_part,
        data.rival_campo,
        data.rival_nombre,
        data.goles_contra,
        data.goles_favor,
        data.esLocal,
        data.estado,
        data.temporada,
        data.foto_campo,
        data.id_equipo,
        id

    ], callback);

}

function updateResultado(id, data, callback) {

    const sql = `
        UPDATE PARTIDO
        SET
            goles_favor = ?,
            goles_contra = ?,
            estado = 'finalizado'
        WHERE id_partido = ?
    `;

    db.query(sql, [
        data.goles_favor,
        data.goles_contra,
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
    getByFiltros,
    getAll,
    getById,
    create,
    update,
    updateResultado,
    remove
}