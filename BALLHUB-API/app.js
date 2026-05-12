const link = require('./db/conexion')
require('dotenv').config()

const express = require('express')
const cors = require('cors')
const path = require('path') // 👈 AÑADIR

const app = express()

const equiposRoutes = require('./equipos/equipos.routes')
const authRoutes = require('./auth/auth.routes')
const partidosRoutes = require('./partidos/partidos.routes')
const jugadoresRoutes = require('./jugadores/jugadores.routes')
const noticiasRoutes = require('./noticias/noticias.routes');
const entrenamientosRoutes = require('./entrenamientos/entrenamientos.routes');
const entrenadoresRoutes = require('./entrenadores/entrenadores.routes');
const usuariosRoutes = require('./usuarios/usuarios.routes');

app.use(cors())
app.use(express.json())

// SERVIR FRONTEND
app.use(express.static(path.join(__dirname, '../front-end')));

// RUTAS LIMPIAS
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../front-end/Paginas/inicioSesion.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../front-end/Paginas/dashboard.html'));
});

app.get('/superadmin', (req, res) => {
    res.sendFile(path.join(__dirname, '../front-end/Paginas/dashboardSuperadmin.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../front-end/index.html'));
});

app.get('/partidos', (req, res) => {
    res.sendFile(path.join(__dirname, '../front-end/Paginas/partidos.html'));
});

app.get('/noticias', (req, res) => {
    res.sendFile(path.join(__dirname, '../front-end/Paginas/noticias.html'));
});

// API
app.use('/api/equipos', equiposRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/partidos', partidosRoutes)
app.use('/api/jugadores', jugadoresRoutes)
app.use('/api/noticias', noticiasRoutes);
app.use('/api/entrenamientos', entrenamientosRoutes);
app.use('/api/entrenadores', entrenadoresRoutes);
app.use('/api/usuarios', usuariosRoutes);

//Evitar control de cache
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
});

app.listen(3000, () => {
    console.log('Servidor iniciado')
})