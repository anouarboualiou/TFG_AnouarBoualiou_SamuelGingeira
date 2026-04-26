
const link = require('./db/conexion')
require('dotenv').config()

const express = require('express')
const cors = require('cors')

const app = express()


const equiposRoutes = require('./equipos/equipos.routes')

app.use(cors())
app.use(express.json())

app.use('/api/equipos', equiposRoutes)

app.listen(3000, () => {
    console.log('Servidor iniciado')
})