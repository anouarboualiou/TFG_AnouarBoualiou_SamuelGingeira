const db = require('../db/conexion')

function getAll(callback) {

    const sql = `SELECT * FROM USUARIO`;

    db.query(sql, callback);
}

function getById(id, callback) {

    const sql = `
        SELECT * FROM USUARIO
        WHERE id_usuario = ?
    `;

    db.query(sql, [id], callback);
}

function getByEmail(email, callback) {

    const sql = `
        SELECT * FROM USUARIO
        WHERE email = ?
    `;

    db.query(sql, [email], callback);
}

function create(data, callback) {

    const sql = `
        INSERT INTO USUARIO (
            email,
            password_hash,
            rol,
            id_entrenador
        )
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [
        data.email,
        data.password_hash,
        data.rol,
        data.id_entrenador
    ], callback);
}

function update(id, data, callback) {

    let sql;
    let values;

    // CON PASSWORD
    if (data.password_hash) {

        sql = `

            UPDATE USUARIO
            SET
                email = ?,
                password_hash = ?,
                rol = ?,
                id_entrenador = ?
            WHERE id_usuario = ?

        `;

        values = [
            data.email,
            data.password_hash,
            data.rol,
            data.id_entrenador,
            id
        ];

    }

    // SIN PASSWORD
    else {

        sql = `

            UPDATE USUARIO
            SET
                email = ?,
                rol = ?,
                id_entrenador = ?
            WHERE id_usuario = ?

        `;

        values = [
            data.email,
            data.rol,
            data.id_entrenador,
            id
        ];

    }

    db.query(sql, values, callback);

}

function remove(id, callback) {

    const sql = `
        DELETE FROM USUARIO
        WHERE id_usuario = ?
    `;

    db.query(sql, [id], callback);
}

module.exports = {
    getAll,
    getById,
    getByEmail,
    create,
    update,
    remove
}