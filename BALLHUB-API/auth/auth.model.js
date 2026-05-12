const db = require('../db/conexion')

function getUserByEmail(email, callback) {

    const sql = `
        SELECT 
            u.id_usuario,
            u.email,
            u.password_hash,
            u.rol,
            u.id_entrenador,

            e.nombre,
            e.apellidos,
            e.foto_perfil,
            e.id_equipo,

            eq.nombre AS nombre_equipo,
            eq.campo

        FROM USUARIO u

        LEFT JOIN ENTRENADOR e 
            ON u.id_entrenador = e.id_entrenador

        LEFT JOIN EQUIPO eq
            ON e.id_equipo = eq.id_equipo

        WHERE u.email = ?
    `;

    db.query(sql, [email], callback);
}

module.exports = { getUserByEmail }