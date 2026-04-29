const db = require('../db/conexion')

function getUserByEmail(email, callback) {

    const sql = `
        SELECT *
        FROM USUARIO
        WHERE email = ?
    `;

    db.query(sql, [email], callback);
}

module.exports = {getUserByEmail}