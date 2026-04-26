
const mysql = require('mysql2')

const link = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
})

link.connect((err) => {
    if(err){
        console.error('Error de conexión MySQL', err)
        return
    }

    console.log('Conectado con éxito a la Base de Datos')
})

module.exports = link