window.user = JSON.parse(localStorage.getItem('user'))

const nombreEquipoSidebar = document.getElementById('nombreEquipoSidebar')
const nombreEntrenadorSidebar = document.getElementById('nombreEntrenadorSidebar')
const emailEntrenadorSidebar = document.getElementById('emailEntrenadorSidebar')
const fotoEntrenadorSidebar = document.getElementById('fotoEntrenadorSidebar')

if (nombreEquipoSidebar) {
    nombreEquipoSidebar.textContent = user.nombre_equipo || 'Sin equipo'
}

if (nombreEntrenadorSidebar) {
    nombreEntrenadorSidebar.textContent = `${user.nombre} ${user.apellidos}`
}

if (emailEntrenadorSidebar) {
    emailEntrenadorSidebar.textContent = user.email
}

if (fotoEntrenadorSidebar) {
    fotoEntrenadorSidebar.src = user.foto_perfil || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
}

const token = localStorage.getItem('token')

if (!token) {
    window.location.href = '/login'
}

// logout
function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/login'
}

window.addEventListener('pageshow', function (event) {
    const token = localStorage.getItem('token')

    if (!token) {
        window.location.href = '/login'
    }
});


function showSection(sectionId, element) {
    document.querySelectorAll("section").forEach(sec => sec.style.display = "none")
    document.getElementById(sectionId).style.display = "block"
    document.querySelectorAll(".trainer-link").forEach(link => {

        link.classList.remove("active")

    })
    element.classList.add("active")

    if (sectionId === "trainings") {
        setTimeout(() => {crearGrafico()}, 100);
    }
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
