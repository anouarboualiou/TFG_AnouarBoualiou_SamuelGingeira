// PROTEGER ACCESO
const token = localStorage.getItem('token');

if (!token) {
    window.location.href = '/login';
}

//LOGOUT 
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // 🔥 evita volver atrás
    window.location.replace('/login');
}

// BLOQUEAR BOTÓN ATRÁS (cache)
window.addEventListener('pageshow', function () {
    const token = localStorage.getItem('token');

    if (!token) {
        window.location.replace('/login');
    }
});

function actualizarEstadisticas() {
    document.getElementById('totalEquipos').textContent = listaEquipos.length;
    document.getElementById('totalEntrenadores').textContent = listaEntrenadores.length;
    document.getElementById('entrenadoresActivos').textContent = listaEntrenadores.filter(e => e.id_equipo).length;
    document.getElementById('conAcceso').textContent = listaEntrenadores.filter(e => e.id_usuario).length;
}