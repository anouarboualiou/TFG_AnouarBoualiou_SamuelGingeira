const db = require('../db/conexion');

function getAll(callback) {

    const sql = `

        SELECT 
            e.*,
            eq.nombre AS nombre_equipo,
            u.id_usuario,
            u.email,
            u.rol

        FROM ENTRENADOR e

        LEFT JOIN EQUIPO eq
            ON e.id_equipo = eq.id_equipo

        LEFT JOIN USUARIO u
            ON e.id_entrenador = u.id_entrenador

    `;


    db.query(sql, callback);

}

function getById(id, callback) {

    const sql = `

        SELECT 
            e.*,
            eq.nombre AS nombre_equipo,
            u.id_usuario,
            u.email,
            u.rol

        FROM ENTRENADOR e

        LEFT JOIN EQUIPO eq
            ON e.id_equipo = eq.id_equipo

        LEFT JOIN USUARIO u
            ON e.id_entrenador = u.id_entrenador

        WHERE e.id_entrenador = ?

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

    const mantenerEquipoActual = !Object.prototype.hasOwnProperty.call(
        data,
        'id_equipo'
    );

    const sql = `
        UPDATE ENTRENADOR
        SET
            nombre = ?,
            apellidos = ?,
            fecha_nacim = ?,
            id_equipo = ${mantenerEquipoActual ? 'id_equipo' : '?'},
            foto_perfil = ?
        WHERE id_entrenador = ?
    `;

    const params = [
        data.nombre,
        data.apellidos,
        data.fecha_nacim
    ];

    if (!mantenerEquipoActual) {
        params.push(data.id_equipo);
    }

    params.push(
        data.foto_perfil,
        id
    );

    db.query(sql, params, callback);
}

function remove(id, callback) {

    // Primero borrar el usuario vinculado si existe
    const sqlUsuario = `
        DELETE FROM USUARIO
        WHERE id_entrenador = ?
    `;

    db.query(sqlUsuario, [id], (err) => {

        if (err) return callback(err);

        // Luego borrar el entrenador
        const sqlEntrenador = `
            DELETE FROM ENTRENADOR
            WHERE id_entrenador = ?
        `;

        db.query(sqlEntrenador, [id], callback);

    });

}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};
