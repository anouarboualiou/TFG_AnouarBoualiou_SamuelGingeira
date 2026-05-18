const listaEntrenamientosContainer = document.getElementById('listaEntrenamientos')
const modalEntrenamiento = document.getElementById('modalEntrenamiento')
const contenidoModalEntrenamiento = document.getElementById('contenidoModalEntrenamiento')
const btnAniadirEntrenamiento = document.getElementById('btnAniadirEntrenamiento')

let listaEntrenamientos = []

const instanciaModalEntrenamiento = new bootstrap.Modal(modalEntrenamiento)


function fechaHoraYaPasada(fecha, hora) {

    if (!fecha || !hora) return false

    // Convertimos a fecha local antes de extraer el día
    const fechaLocal = new Date(fecha)
    const year = fechaLocal.getFullYear()
    const month = String(fechaLocal.getMonth() + 1).padStart(2, '0')
    const day = String(fechaLocal.getDate()).padStart(2, '0')
    const horaSolo = hora.slice(0, 5)

    const fechaEntrenamiento = new Date(`${year}-${month}-${day}T${horaSolo}:00`);

    if (isNaN(fechaEntrenamiento.getTime())) return false;

    return new Date() >= fechaEntrenamiento;
}

// =============================
// CARGAR ENTRENAMIENTOS
// =============================

async function cargarEntrenamientos() {

    try {

        const res = await fetch(

            '/api/entrenamientos',
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

        );

        const entrenamientos = await res.json()
        listaEntrenamientos = entrenamientos.filter(e => e.id_equipo == user.id_equipo)

        renderEntrenamientos(listaEntrenamientos)
        crearGrafico()

    }
    catch (err) {
        console.error(err)
    }
}

// =============================
// RENDER
// =============================

function renderEntrenamientos(entrenamientos) {

    listaEntrenamientosContainer.innerHTML = ''

    if(entrenamientos.length === 0){
        listaEntrenamientosContainer.innerHTML = `
            <div class="text-center py-5">
                <i class="bi bi-activity fs-1 text-muted"></i>
                <p class="text-muted mt-3">No hay entrenamientos registrados</p>
            </div>
        `;
        return;
    }

    entrenamientos.forEach(entrenamiento => {

        const puedeAsignarAsistencia = fechaHoraYaPasada(entrenamiento.fecha, entrenamiento.hora_entreno) && entrenamiento.estado !== 'finalizado';

        const yaTieneAsistencia =
            entrenamiento.asistentes !== null &&
            entrenamiento.asistentes !== undefined

        listaEntrenamientosContainer.innerHTML += `

            <div class="tarjetaEntreno mb-3">

                <div>

                    <span class="badge bg-primary mb-2">

                        ${entrenamiento.tipo}

                    </span>

                    <h5 class="mb-1">

                        ${entrenamiento.titulo || 'Entrenamiento'}

                    </h5>

                    <p class="text-muted small mb-1">
                        ${entrenamiento.descripcion || ''}
                    </p>

                    <small class="text-muted">

                        ${formatearFecha(entrenamiento.fecha)}
                        ·
                        ${entrenamiento.hora_entreno?.slice(0,5) || '--:--'}
                        ·
                        ${entrenamiento.tiempo} min

                    </small>

                </div>

                <div class="trainer-actions">

                    ${fechaHoraYaPasada(
                        entrenamiento.fecha,
                        entrenamiento.hora_entreno
                    )

                        ?

                        `
                        <button
                            class="btn btn-success btn-sm btn-asistencia trainer-action-main"
                            data-id="${entrenamiento.id_entrenamiento}">

                            <i class="bi bi-people"></i>

                            ${entrenamiento.asistentes !== null
                                ? `${entrenamiento.asistentes} asistentes`
                                : 'Registrar'
                            }

                        </button>
                        `

                        :

                        `
                        <button
                            class="btn btn-secondary btn-sm opacity-75 trainer-action-main"
                            disabled>

                            Pendiente

                        </button>
                        `
                    }

                    <button
                        class="btn btn-warning btn-sm btn-editar-entreno trainer-action-icon"
                        data-id="${entrenamiento.id_entrenamiento}">

                        <i class="bi bi-pencil"></i>

                    </button>

                    <button
                        class="btn btn-danger btn-sm btn-borrar-entreno trainer-action-icon"
                        data-id="${entrenamiento.id_entrenamiento}">

                        <i class="bi bi-trash"></i>

                    </button>

                </div>

            </div>

        `;

    });

}



// =============================
// FORMATEAR FECHA
// =============================

function formatearFecha(fecha) {

    return new Date(fecha).toLocaleDateString('es-ES')

}



// =============================
// MODAL CREAR
// =============================

btnAniadirEntrenamiento.addEventListener('click', abrirModalCrearEntrenamiento)

function abrirModalCrearEntrenamiento() {

    contenidoModalEntrenamiento.innerHTML = `

        <div class="modal-header">

            <h5 class="modal-title">

                Añadir entrenamiento

            </h5>

            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal">
            </button>

        </div>

        <div class="modal-body">

            <form id="formEntrenamiento">

                <div class="mb-3">

                    <label class="form-label">
                        Título
                    </label>

                    <input
                        type="text"
                        class="form-control"
                        id="titulo">

                </div>

                <div class="mb-3">

                    <label class="form-label">

                        Tipo

                    </label>

                    <select
                        class="form-select"
                        id="tipo">

                        <option value="fisico">
                            Físico
                        </option>

                        <option value="tecnico">
                            Técnico
                        </option>

                        <option value="tactico">
                            Táctico
                        </option>

                    </select>

                </div>

                <div class="mb-3">

                    <label class="form-label">

                        Descripción

                    </label>

                    <textarea class="form-control" id="descripcion"></textarea>

                </div>

                <div class="mb-3">

                    <label class="form-label">

                        Fecha 

                    </label>

                    <input
                        type="date"
                        class="form-control"
                        id="fecha">

                </div>

                <div class="mb-3">

                    <label class="form-label">
                        Hora
                    </label>

                    <input
                        type="time"
                        class="form-control"
                        id="horaEntreno">

                </div>

                <div class="mb-3">

                    <label class="form-label">

                        Duración (minutos)

                    </label>

                    <input
                        type="number"
                        class="form-control"
                        id="tiempo">

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
                id="btnGuardarEntrenamiento">

                Guardar

            </button>

        </div>

    `;

    instanciaModalEntrenamiento.show();

    document.getElementById('btnGuardarEntrenamiento').addEventListener('click', guardarEntrenamiento)

}


// =============================
// CREAR ENTRENAMIENTO
// =============================

async function guardarEntrenamiento() {

    const entrenamiento = {

        titulo: document.getElementById('titulo').value,

        tipo: document.getElementById('tipo').value,

        descripcion: document.getElementById('descripcion').value,

        fecha: document.getElementById('fecha').value,

        hora_entreno: document.getElementById('horaEntreno').value,

        tiempo: document.getElementById('tiempo').value,

        id_equipo: user.id_equipo

    }

    try {

        const res = await fetch(

            '/api/entrenamientos',

            {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(entrenamiento)

            }

        );

        if (!res.ok) {

            throw new Error(
                'Error creando entrenamiento'
            )

        }

        instanciaModalEntrenamiento.hide()

        mostrarAlerta(
            'Entrenamiento añadido',
            'success'
        )

        cargarEntrenamientos()

    }
    catch (err) {

        console.error(err)

    }

}

// =============================
// MODAL ASISTENCIA
// =============================

document.addEventListener('click', e => {

    if (e.target.closest('.btn-asistencia')) {

        const id = e.target.closest('.btn-asistencia').dataset.id;
        abrirModalAsistencia(id)

    }

});



function abrirModalAsistencia(idEntrenamiento) {

    const entrenamiento = listaEntrenamientos.find( e => e.id_entrenamiento == idEntrenamiento)

    if (
        !entrenamiento ||
        !fechaHoraYaPasada(
            entrenamiento.fecha,
            entrenamiento.hora_entreno
        )) 
    {
            
        mostrarAlerta('Aún no puedes registrar asistencia para este entrenamiento','warning')

        return
    }

    const totalJugadores = listaJugadores.length

    contenidoModalEntrenamiento.innerHTML = `

        <div class="modal-header">

            <h5 class="modal-title">

                ${entrenamiento.asistentes !== null
                    ? 'Editar asistencia'
                    : 'Registrar asistencia'
                }

            </h5>

            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal">
            </button>

        </div>

        <div class="modal-body">

            <p class="text-muted">

                Máximo:
                ${totalJugadores}
                jugadores

            </p>

            <div class="mb-3">

                <label class="form-label">

                    Asistentes

                </label>

                <input
                    type="number"
                    id="inputAsistentes"
                    class="form-control"
                    min="0"
                    max="${totalJugadores}"
                    value="${entrenamiento.asistentes || 0}">

            </div>

        </div>

        <div class="modal-footer">

            <button
                class="btn btn-secondary"
                data-bs-dismiss="modal">

                Cancelar

            </button>

            <button
                class="btn btn-success"
                id="btnGuardarAsistencia">

                Guardar

            </button>

        </div>

    `;

    instanciaModalEntrenamiento.show()

    document.getElementById('btnGuardarAsistencia').addEventListener('click', () => guardarAsistencia(idEntrenamiento,totalJugadores))

}


// =============================
// GUARDAR ASISTENCIA
// =============================

async function guardarAsistencia(idEntrenamiento, totalJugadores) {

    const asistentes = parseInt(document.getElementById('inputAsistentes').value)

    if (asistentes > totalJugadores) {

        mostrarAlerta('No puedes superar el número de jugadores','danger')
        return

    }

    try {

        const res = await fetch(

            `/api/entrenamientos/${idEntrenamiento}/asistencia`,

            {

                method: 'PUT',

                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },

                body: JSON.stringify({
                    asistentes
                })

            }

        );

        if (!res.ok) {

            throw new Error(
                'Error guardando asistencia'
            )

        }

        instanciaModalEntrenamiento.hide();

        mostrarAlerta('Asistencia registrada','success')
        cargarEntrenamientos()

    }
    catch (err) {
        console.error(err);
    }

}

cargarEntrenamientos();

// =============================
// EDITAR
// =============================

document.addEventListener('click', e => {

    if (e.target.closest('.btn-editar-entreno')) {

        const id = e.target.closest('.btn-editar-entreno').dataset.id;
        abrirModalEditarEntreno(id)

    }

});

function abrirModalEditarEntreno(idEntrenamiento) {

    const entrenamiento = listaEntrenamientos.find( e => e.id_entrenamiento == idEntrenamiento)

    contenidoModalEntrenamiento.innerHTML = `

        <div class="modal-header">

            <h5 class="modal-title">
                Editar entrenamiento
            </h5>

            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal">
            </button>

        </div>

        <div class="modal-body">

            <div class="mb-3">

                <label class="form-label">
                    Título
                </label>

                <input
                    type="text"
                    id="editTitulo"
                    class="form-control"
                    value="${entrenamiento.titulo || ''}">

            </div>

            <div class="mb-3">

                <label class="form-label">
                    Tipo
                </label>

                <select
                    id="editTipo"
                    class="form-select">

                    <option value="fisico"
                        ${entrenamiento.tipo === 'fisico' ? 'selected' : ''}>
                        Físico
                    </option>

                    <option value="tecnico"
                        ${entrenamiento.tipo === 'tecnico' ? 'selected' : ''}>
                        Técnico
                    </option>

                    <option value="tactico"
                        ${entrenamiento.tipo === 'tactico' ? 'selected' : ''}>
                        Táctico
                    </option>

                </select>

            </div>

            <div class="mb-3">

                <label class="form-label">
                    Descripción
                </label>

                <textarea
                    id="editDescripcion"
                    class="form-control">${entrenamiento.descripcion || ''}</textarea>

            </div>

            <div class="mb-3">

                <label class="form-label">
                    Fecha
                </label>

                <input
                    type="date"
                    id="editFecha"
                    class="form-control"
                    value="${entrenamiento.fecha.split('T')[0]}">

            </div>

            <div class="mb-3">

                <label class="form-label">
                    Hora
                </label>

                <input
                    type="time"
                    id="editHoraEntreno"
                    class="form-control"
                    value="${entrenamiento.hora_entreno?.slice(0,5) || ''}">

            </div>

            <div class="mb-3">

                <label class="form-label">
                    Duración
                </label>

                <input
                    type="number"
                    id="editTiempo"
                    class="form-control"
                    value="${entrenamiento.tiempo}">

            </div>

        </div>

        <div class="modal-footer">

            <button
                class="btn btn-secondary"
                data-bs-dismiss="modal">

                Cancelar

            </button>

            <button
                class="btn btn-primary"
                id="btnActualizarEntreno">

                Guardar cambios

            </button>

        </div>

    `;

    instanciaModalEntrenamiento.show();

    document.getElementById('btnActualizarEntreno').addEventListener('click', () => actualizarEntrenamiento(idEntrenamiento))

}

// =============================
// ACTUALIZAR
// =============================

async function actualizarEntrenamiento(idEntrenamiento) {

    const body = {

        titulo:
            document.getElementById('editTitulo').value,

        tipo:
            document.getElementById('editTipo').value,

        descripcion:
            document.getElementById('editDescripcion').value,

        fecha:
            document.getElementById('editFecha').value,

        hora_entreno:
            document.getElementById('editHoraEntreno').value,

        tiempo: document.getElementById('editTiempo').value,

        id_equipo: user.id_equipo

    };

    try {

        const res = await fetch(

            `/api/entrenamientos/${idEntrenamiento}`,

            {

                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(body)

            }

        );

        if (!res.ok) {

            throw new Error(
                'Error actualizando entrenamiento'
            );

        }

        instanciaModalEntrenamiento.hide();
        mostrarAlerta('Entrenamiento actualizado','warning');
        cargarEntrenamientos()

    }
    catch (err) {
        console.error(err);
    }

}

// =============================
// BORRAR
// =============================

document.addEventListener('click', e => {

    if (e.target.closest('.btn-borrar-entreno')) {

        const id = e.target.closest('.btn-borrar-entreno').dataset.id;
        borrarEntrenamiento(id);

    }

});

async function borrarEntrenamiento(idEntrenamiento) {

    const confirmar = confirm('¿Eliminar entrenamiento?')

    if (!confirmar) {
        return;
    }

    try {

        const res = await fetch(

            `/api/entrenamientos/${idEntrenamiento}`,

            {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }

            }

        );

        if (!res.ok) {
            throw new Error('Error eliminando entrenamiento');
        }

        mostrarAlerta('Entrenamiento eliminado','danger');
        cargarEntrenamientos();

    }
    catch (err) {
        console.error(err);
    }

}
