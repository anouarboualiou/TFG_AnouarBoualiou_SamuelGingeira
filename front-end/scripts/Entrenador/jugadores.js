const btnAniadirJugador = document.getElementById('btnAniadirJugador')
const contenidoModalJugador = document.getElementById('contenidoModalJugador')
let listaJugadores = []

async function cargarJugadores() {

    try {

        const res = await fetch(

            `/api/jugadores/equipo/${user.id_equipo}`,

            {

                headers: {
                    Authorization: `Bearer ${token}`
                }

            }

        );

        const jugadores = await res.json();

        listaJugadores = jugadores;

        renderJugadores(jugadores);

    }
    catch (err) {

        console.error(err);

    }

}

function renderJugadores(jugadores) {

    const contenedor = document.getElementById('contenedorJugadores');

    if(jugadores.length === 0){
        contenedor.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="bi bi-people fs-1 text-muted"></i>
                <p class="text-muted mt-3">No hay jugadores en la plantilla</p>
            </div>
        `;
        return;
    }

    contenedor.innerHTML = '';

    jugadores.forEach(jugador => {

        contenedor.innerHTML += `

            <div class="col-12 col-md-6 col-xl-3">

                <div class="cardJugador">

                    <div class="text-center mb-3">

                        <img
                            src="${jugador.foto_perfil || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}"
                            class="fotoJugadorCard">

                    </div>

                    <div class="text-center mb-3">

                        <div class="nombreJugador">
                            ${jugador.nombre} ${jugador.apellidos}
                        </div>

                    </div>

                    <div class="d-flex justify-content-center mb-3">

                        <span class="badgeJugador">
                            ${jugador.posicion || 'Sin posición'}
                        </span>

                    </div>

                    <div class="infoJugador">

                        <div class="mb-2">
                            <strong>Dorsal:</strong>
                            ${jugador.dorsal || '-'}
                        </div>

                        <div class="mb-2">
                            <strong>Edad:</strong>
                            ${calcularEdad(jugador.fecha_nacim)}
                        </div>


                    </div>

                    <div class="trainer-actions">

                        <button
                            class="btn btn-warning flex-fill btn-editar-jugador"
                            data-id="${jugador.id_jugador}">

                            <i class="bi bi-pencil"></i>

                        </button>

                        <button
                            class="btn btn-danger flex-fill btn-borrar-jugador"
                            data-id="${jugador.id_jugador}">

                            <i class="bi bi-trash"></i>

                        </button>

                    </div>

                </div>

            </div>

        `;

    });

}

function calcularEdad(fecha) {

    const nacimiento = new Date(fecha);

    const hoy = new Date();

    let edad = hoy.getFullYear() - nacimiento.getFullYear();

    const mes = hoy.getMonth() - nacimiento.getMonth();

    if (
        mes < 0 ||
        (mes === 0 && hoy.getDate() < nacimiento.getDate())
    ) {

        edad--;

    }

    return edad;

}

cargarJugadores();

btnAniadirJugador.addEventListener('click', abrirModalCrearJugador);

function abrirModalCrearJugador() {

    const contenidoModal = document.getElementById(
        'contenidoModalJugador'
    );

    contenidoModal.innerHTML = `

        <div class="modal-header">

            <h5 class="modal-title">
                Añadir jugador
            </h5>

            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal">
            </button>

        </div>

        <div class="modal-body">

            <form id="formJugador">

                <div class="mb-3">

                    <label class="form-label">
                        Nombre
                    </label>

                    <input
                        type="text"
                        id="nombreJugador"
                        class="form-control"
                        required>

                </div>

                <div class="mb-3">

                    <label class="form-label">
                        Apellidos
                    </label>

                    <input
                        type="text"
                        id="apellidosJugador"
                        class="form-control"
                        required>

                </div>

                <div class="mb-3">

                    <label class="form-label">
                        Fecha nacimiento
                    </label>

                    <input
                        type="date"
                        id="fechaJugador"
                        class="form-control"
                        required>

                </div>

                <div class="mb-3">

                    <label class="form-label">
                        Dorsal
                    </label>

                    <input
                        type="number"
                        id="dorsalJugador"
                        class="form-control">

                </div>

                <div class="mb-3">

                    <label class="form-label">
                        Posición
                    </label>

                    <select
                        id="posicionJugador"
                        class="form-select">

                        <option value="Portero">Portero</option>
                        <option value="Defensa">Defensa</option>
                        <option value="Centrocampista">Centrocampista</option>
                        <option value="Delantero">Delantero</option>

                    </select>

                </div>

                <div class="mb-3">

                    <label class="form-label">
                        Foto perfil
                    </label>

                    <input
                        type="text"
                        id="fotoJugador"
                        class="form-control">

                </div>

            </form>

        </div>

        <div class="modal-footer">

            <button
                class="btn btn-secondary"
                data-bs-dismiss="modal">

                Cancelar

            </button>

            <button
                class="btn btn-primary"
                id="btnGuardarJugador">

                Guardar

            </button>

        </div>

    `;

    document
        .getElementById('btnGuardarJugador')
        .addEventListener(
            'click',
            guardarJugador
        );

}

async function guardarJugador() {

    const user = JSON.parse(
        localStorage.getItem('user')
    );

    const jugador = {

        nombre: document.getElementById('nombreJugador').value,

        apellidos: document.getElementById('apellidosJugador').value,

        fecha_nacim: document.getElementById('fechaJugador').value,

        dorsal: document.getElementById('dorsalJugador').value,

        posicion: document.getElementById('posicionJugador').value,

        foto_perfil: document.getElementById('fotoJugador').value,

        id_equipo: user.id_equipo

    };

    try {

        const res = await fetch(
            '/api/jugadores',
            {

                method: 'POST',

                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },

                body: JSON.stringify(jugador)

            }
        );

        if (!res.ok) {
            throw new Error(
                'Error al crear jugador'
            );
        }

        bootstrap.Modal
            .getInstance(
                document.getElementById('modalJugador')
            )
            .hide();

        cargarJugadores();

    }
    catch (err) {

        console.error(err);

    }

}


document.addEventListener('click', function(e){

    const botonEditar = e.target.closest('.btn-editar-jugador');

    const botonBorrar = e.target.closest('.btn-borrar-jugador');

    if (botonEditar) {
        abrirModalEditarJugador(botonEditar);
    }

    if (botonBorrar) {
        borrarJugador(botonBorrar);
    }

});


function abrirModalEditarJugador(boton){

    const id = boton.dataset.id;

    const jugador = listaJugadores.find(
        j => j.id_jugador == id
    );

    contenidoModalJugador.innerHTML = `

        <div class="modal-header">

            <h5 class="modal-title">
                Editar jugador
            </h5>

            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal">
            </button>

        </div>

        <div class="modal-body">

            <form>

                <input
                    type="hidden"
                    id="idJugadorEditar"
                    value="${jugador.id_jugador}">

                <div class="mb-3">

                    <label class="form-label">
                        Nombre
                    </label>

                    <input
                        type="text"
                        id="editarNombreJugador"
                        class="form-control"
                        value="${jugador.nombre}"
                        required>

                </div>

                <div class="mb-3">

                    <label class="form-label">
                        Apellidos
                    </label>

                    <input
                        type="text"
                        id="editarApellidosJugador"
                        class="form-control"
                        value="${jugador.apellidos}"
                        required>

                </div>

                <div class="mb-3">

                    <label class="form-label">
                        Fecha nacimiento
                    </label>

                    <input
                        type="date"
                        id="editarFechaJugador"
                        class="form-control"
                        value="${jugador.fecha_nacim?.split('T')[0]}"
                        required>

                </div>

                <div class="mb-3">

                    <label class="form-label">
                        Dorsal
                    </label>

                    <input
                        type="number"
                        id="editarDorsalJugador"
                        class="form-control"
                        value="${jugador.dorsal || ''}">

                </div>

                <div class="mb-3">

                    <label class="form-label">
                        Posición
                    </label>

                    <select
                        id="editarPosicionJugador"
                        class="form-select">

                        <option value="Portero" ${jugador.posicion === 'Portero' ? 'selected' : ''}>Portero</option>

                        <option value="Defensa" ${jugador.posicion === 'Defensa' ? 'selected' : ''}>Defensa</option>

                        <option value="Centrocampista" ${jugador.posicion === 'Centrocampista' ? 'selected' : ''}>Centrocampista</option>

                        <option value="Delantero" ${jugador.posicion === 'Delantero' ? 'selected' : ''}>Delantero</option>

                    </select>

                </div>

                <div class="mb-3">

                    <label class="form-label">
                        Foto perfil
                    </label>

                    <input
                        type="text"
                        id="editarFotoJugador"
                        class="form-control"
                        value="${jugador.foto_perfil || ''}">

                </div>

            </form>

        </div>

        <div class="modal-footer">

            <button
                class="btn btn-secondary"
                data-bs-dismiss="modal">

                Cancelar

            </button>

            <button
                class="btn btn-primary"
                id="btnActualizarJugador">

                Guardar cambios

            </button>

        </div>

    `;

    new bootstrap.Modal(
        document.getElementById('modalJugador')
    ).show();

    document
        .getElementById('btnActualizarJugador')
        .addEventListener(
            'click',
            actualizarJugador
        );

}

async function actualizarJugador(){

    const id = document
        .getElementById('idJugadorEditar')
        .value;

    const jugador = {

        nombre: document.getElementById('editarNombreJugador').value,

        apellidos: document.getElementById('editarApellidosJugador').value,

        fecha_nacim: document.getElementById('editarFechaJugador').value,

        dorsal: document.getElementById('editarDorsalJugador').value,

        posicion: document.getElementById('editarPosicionJugador').value,

        foto_perfil: document.getElementById('editarFotoJugador').value,

        id_equipo: user.id_equipo

    };

    try {

        const res = await fetch(

            `/api/jugadores/${id}`,

            {

                method: 'PUT',

                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },

                body: JSON.stringify(jugador)

            }

        );

        if (!res.ok) {
            throw new Error('Error al actualizar');
        }

        bootstrap.Modal
            .getInstance(
                document.getElementById('modalJugador')
            )
            .hide();

        cargarJugadores();

    }
    catch(err){

        console.error(err);

    }

}

async function borrarJugador(boton){

    const id = boton.dataset.id;

    const confirmar = confirm(
        '¿Seguro que quieres eliminar este jugador?'
    );

    if (!confirmar) return;

    try {

        const res = await fetch(

            `/api/jugadores/${id}`,

            {

                method: 'DELETE',

                headers: {
                    Authorization: `Bearer ${token}`
                }

            }

        );

        if (!res.ok) {
            throw new Error('Error al borrar');
        }

        cargarJugadores();

    }
    catch(err){

        console.error(err);

    }

}