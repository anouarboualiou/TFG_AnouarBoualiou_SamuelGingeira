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


function mostrarAlerta(mensaje, tipo = 'success'){

    const contenedor = document.getElementById('contenedorAlertas')
    const id = 'alerta-' + Date.now()

    const colores = {

        success:'success',
        warning:'warning',
        danger:'danger',
        info:'info'

    }

    const alerta = document.createElement('div')
    alerta.innerHTML = `

        <div
            id="${id}"
            class="alert alert-${colores[tipo]} alert-dismissible fade show shadow"
            role="alert">

            ${mensaje}

            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="alert">
            </button>

        </div>

    `;

    contenedor.appendChild(alerta)

    setTimeout(() => {

        const elemento = document.getElementById(id);

        if(elemento){

            bootstrap.Alert.getOrCreateInstance(elemento).close();
        }

    }, 3000)

}
