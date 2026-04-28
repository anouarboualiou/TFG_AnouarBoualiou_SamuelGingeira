
const link = require('./db/conexion')
require('dotenv').config()

const express = require('express')
const cors = require('cors')

const app = express()

const equiposRoutes = require('./equipos/equipos.routes')
const authRoutes = require('./auth/auth.routes')
const partidosRoutes = require('./partidos/partidos.routes')

app.use(cors())
app.use(express.json())

app.use('/api/equipos', equiposRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/partidos', partidosRoutes)

app.listen(3000, () => {
    console.log('Servidor iniciado')
})