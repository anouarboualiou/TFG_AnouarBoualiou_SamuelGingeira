
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

/*

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
}*/

//Mas completo 

function getById(id, callback) {

    const sqlEquipo = `
        SELECT 
            e.*,
            en.nombre AS entrenador_nombre,
            en.apellidos AS entrenador_apellidos
        FROM EQUIPO e
        LEFT JOIN ENTRENADOR en 
            ON e.id_equipo = en.id_equipo
        WHERE e.id_equipo = ?
    `

    db.query(sqlEquipo, [id], (err, equipoResult) => {

        if (err) {
            return callback(err)
        }

        if (equipoResult.length === 0) {
            return callback(null, [])
        }

        const equipo = equipoResult[0]

        /* =========================================
           JUGADORES
        ========================================= */

        const sqlJugadores = `
            SELECT
                id_jugador,
                nombre,
                apellidos,
                dorsal,
                posicion,
                fecha_nacim,
                foto_perfil
            FROM JUGADOR
            WHERE id_equipo = ?
            ORDER BY dorsal ASC
        `

        db.query(sqlJugadores, [id], (err, jugadores) => {

            if (err) {
                return callback(err)
            }

            equipo.jugadores = jugadores

            /* =========================================
               PARTIDOS
            ========================================= */

            const sqlPartidos = `
                SELECT
                    id_partido,
                    rival_nombre,
                    rival_campo,
                    fecha_part,
                    hora_part,
                    goles_favor,
                    goles_contra,
                    estado,
                    esLocal,
                    foto_campo
                FROM PARTIDO
                WHERE id_equipo = ?
                ORDER BY fecha_part ASC
            `

            db.query(sqlPartidos, [id], (err, partidos) => {

                if (err) {
                    return callback(err)
                }

                equipo.partidos = partidos.map(partido => ({

                    id_partido: partido.id_partido,

                    nombre_equipo: equipo.nombre,

                    rival_nombre: partido.rival_nombre,

                    fecha: partido.fecha_part,

                    hora: partido.hora_part,

                    estado: partido.estado,

                    goles_favor: partido.goles_favor,

                    goles_contra: partido.goles_contra,

                    campo: partido.rival_campo,

                    foto_campo: partido.foto_campo,

                    esLocal: partido.esLocal
                }))


                /* =========================================
                   NOTICIAS
                ========================================= */

                const sqlNoticias = `
                    SELECT
                        id_noticia,
                        titulo,
                        subtitulo,
                        descripcion,
                        foto_noticia,
                        fecha_pub
                    FROM NOTICIA
                    WHERE id_equipo = ?
                    ORDER BY fecha_pub DESC
                    LIMIT 6
                `

                db.query(sqlNoticias, [id], (err, noticias) => {

                    if (err) {
                        return callback(err)
                    }

                    equipo.noticias = noticias.map(noticia => ({

                        id_noticia: noticia.id_noticia,

                        titulo: noticia.titulo,

                        subtitulo: noticia.subtitulo,

                        descripcion: noticia.descripcion,

                        foto: noticia.foto_noticia,

                        fecha: noticia.fecha_pub
                    }))

                    /* =========================================
                       ENTRENAMIENTOS
                    ========================================= */

                    const sqlEntrenamientos = `
                        SELECT
                            id_entrenamiento,
                            titulo,
                            descripcion,
                            fecha,
                            hora_entreno,
                            asistentes,
                            tipo,
                            estado,
                            tiempo
                        FROM ENTRENAMIENTO
                        WHERE id_equipo = ?
                        ORDER BY fecha DESC
                    `

                    db.query(sqlEntrenamientos, [id], (err, entrenamientos) => {

                        if (err) {
                            return callback(err)
                        }

                        equipo.entrenamientos_lista = entrenamientos

                        /* =========================================
                           ESTADISTICAS
                        ========================================= */

                        equipo.entrenamientos =
                            entrenamientos.length

                        equipo.ultimo_entrenamiento =
                            entrenamientos[0]?.fecha || null

                        equipo.ultimo_partido =
                            partidos[0]?.fecha_part || null

                        /* =========================================
                           GRAFICA ASISTENCIAS
                        ========================================= */

                        equipo.asistencias =
                            entrenamientos
                                .slice(0, 7)
                                .reverse()
                                .map(entreno => ({

                                    fecha:
                                        new Date(entreno.fecha)
                                            .toLocaleDateString('es-ES', {
                                                day: '2-digit',
                                                month: 'short'
                                            }),

                                    total:
                                        entreno.estado === 'finalizado'
                                            ? entreno.asistentes
                                            : null
                                }))

                        callback(null, [equipo])

                    })

                })

            })

        })

    })

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