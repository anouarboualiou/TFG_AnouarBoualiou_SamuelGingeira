
const contenedorPartidos = document.getElementById(
    'contenedorPartidos'
);

const contenidoModalPartido = document.getElementById(
    'contenidoModalPartido'
);

const btnAniadirPartido = document.getElementById(
    'btnAniadirPartido'
);

let listaPartidos = [];

function fechaHoraYaPasada(fecha, hora) {
    if (!fecha || !hora) return false;

    const fechaLocal = new Date(fecha);
    const year = fechaLocal.getFullYear();
    const month = String(fechaLocal.getMonth() + 1).padStart(2, '0');
    const day = String(fechaLocal.getDate()).padStart(2, '0');

    const horaSolo = hora.slice(0, 5);

    const fechaPartido = new Date(`${year}-${month}-${day}T${horaSolo}:00`);

    if (isNaN(fechaPartido.getTime())) return false;

    return new Date() >= fechaPartido;
}

async function cargarPartidos() {

    try {

        const res = await fetch(

            '/api/partidos',

            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

        );

        const partidos = await res.json();

        listaPartidos = partidos.filter(
            p => p.id_equipo == user.id_equipo
        );

        renderPartidos(listaPartidos);

    }
    catch (err) {

        console.error(err);

    }

}

function renderPartidos(partidos) {

    contenedorPartidos.innerHTML = '';

    if (partidos.length === 0) {
        contenedorPartidos.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="bi bi-calendar-event fs-1 text-muted"></i>
                <p class="text-muted mt-3">No hay partidos registrados</p>
            </div>
        `;
        return;
    }

    partidos.forEach(partido => {

        const puedeFinalizar =
            fechaHoraYaPasada(
                partido.fecha_part,
                partido.hora_part
            ) &&
            partido.estado !== 'finalizado';

        let resultadoClase = '';

        if (partido.estado === 'finalizado') {

            resultadoClase =
                partido.goles_favor > partido.goles_contra
                    ? 'victoria'
                    : partido.goles_favor < partido.goles_contra
                        ? 'derrota'
                        : 'empate';
        }

        const resultadoTexto =
            partido.estado === 'finalizado'
                ? `${partido.goles_favor} - ${partido.goles_contra}`
                : 'VS';

        contenedorPartidos.innerHTML += `

            <div class="col-12 col-xl-6">

                <article class="tarjeta-partido">

                    <header
                        class="encabezado-partido ${resultadoClase}"

                        style="
                            background-image:
                            linear-gradient(
                                rgba(0,0,0,0.45),
                                rgba(0,0,0,0.75)
                            ),
                            url('${partido.foto_campo ||
                                'https://images.unsplash.com/photo-1486286701208-1d58e9338013?q=80&w=1200&auto=format&fit=crop'
                            }');
                        ">

                        <div class="overlayResultado">

                            <div class="estadoPartido">

                                ${
                                    partido.estado === 'finalizado'
                                        ?

                                        `
                                        <span class="badge bg-dark">
                                            FINALIZADO
                                        </span>
                                        `

                                        :

                                        `
                                        <span class="badge bg-warning text-dark">
                                            PRÓXIMAMENTE
                                        </span>
                                        `
                                }

                            </div>

                            <div class="equiposPartido">

                                <div class="equipoNombre">

                                    ${user.nombre_equipo || 'Mi Equipo'}

                                </div>

                                <div class="resultadoCentral
                                    ${partido.estado === 'finalizado'
                                        ? 'resultado'
                                        : 'vs'
                                    }">

                                    ${resultadoTexto}

                                </div>

                                <div class="equipoNombre">

                                    ${partido.rival_nombre}

                                </div>

                            </div>

                            ${
                                partido.estado === 'finalizado'

                                    ?

                                    `
                                    <div class="indicadorResultado">

                                        ${
                                            resultadoClase === 'victoria'

                                                ?

                                                `
                                                <span class="pillResultado victoria">
                                                    Victoria
                                                </span>
                                                `

                                                :

                                                resultadoClase === 'derrota'

                                                    ?

                                                    `
                                                    <span class="pillResultado derrota">
                                                        Derrota
                                                    </span>
                                                    `

                                                    :

                                                    `
                                                    <span class="pillResultado empate">
                                                        Empate
                                                    </span>
                                                    `
                                        }

                                    </div>
                                    `

                                    :

                                    ''
                            }

                        </div>

                    </header>
                        

                    <div class="info-partido text-muted text-center">

                        <p class="mt-3">

                            <i class="bi bi-calendar3 text-primary me-2"></i>

                            ${formatearFecha(partido.fecha_part)}

                        </p>

                        <p>

                            <i class="bi bi-clock text-primary me-2"></i>

                            ${partido.hora_part?.slice(0, 5) || '--:--'}

                        </p>

                        <p>

                            <i class="bi bi-geo-alt text-primary me-2"></i>

                            ${partido.rival_campo ||
                            'Sin campo'
                            }

                        </p>

                        

                    </div>

                    <!-- BOTONES -->
                    <div class="accionesPartido">
                        ${partido.estado === 'finalizado'

                                        ?

                                        `
                                <button
                                    class="btn btn-danger btn-sm text-white opacity-75"
                                    disabled>

                                    Finalizado

                                </button>
                            `

                                        :

                                        puedeFinalizar

                                            ?

                                            `
                                <button
                                    class="btn btn-success btn-sm text-white btn-resultado"
                                    data-id="${partido.id_partido}">

                                    Resultado

                                </button>
                            `

                                            :

                                            `
                                <button
                                    class="btn btn-secondary btn-sm text-white opacity-75"
                                    disabled>

                                    Pendiente

                                </button>
                            `
                                    }

                            <button
                                class="btn btn-warning btn-sm btn-editar-partido"
                                data-id="${partido.id_partido}">

                                <i class="bi bi-pencil"></i>

                            </button>

                            <button
                                class="btn btn-danger btn-sm btn-borrar-partido"
                                data-id="${partido.id_partido}">

                                <i class="bi bi-trash"></i>

                            </button>

                    </div>

                </article>

            </div>
            `;

    });

}

function formatearFecha(fecha) {

    return new Date(fecha)
        .toLocaleDateString('es-ES');

}

cargarPartidos();

btnAniadirPartido.addEventListener(
    'click',
    abrirModalCrearPartido
);



function abrirModalCrearPartido() {

    contenidoModalPartido.innerHTML = `

        <div class="modal-header">

            <h5 class="modal-title">

                Añadir partido

            </h5>

            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal">
            </button>

        </div>

        <div class="modal-body">

            <form id="formPartido">

                <div class="mb-3">

                    <label class="form-label">

                        Rival

                    </label>

                    <input
                        type="text"
                        id="rivalNombre"
                        class="form-control"
                        required>

                </div>

                <div class="mb-3">

                    <label class="form-label">
                        Campo
                    </label>

                    <input
                        type="text"
                        id="rivalCampo"
                        class="form-control">

                </div>

                <div class="mb-3">

                    <label class="form-label">

                        Fecha

                    </label>

                    <input
                        type="date"
                        id="fechaPartido"
                        class="form-control"
                        required>

                </div>

                <div class="mb-3">

                    <label class="form-label">
                        Hora
                    </label>

                    <input
                        type="time"
                        id="horaPartido"
                        class="form-control">

                </div>

                <div class="mb-3">

                    <label class="form-label">

                        Foto campo

                    </label>

                    <input
                        type="text"
                        id="fotoCampo"
                        class="form-control">

                </div>

                <div class="mb-3">

                    <label class="form-label">

                        Local o visitante

                    </label>

                    <select
                        id="esLocal"
                        class="form-select"
                        onchange="toggleCampoPartido()">

                        <option value="1">
                            Local
                        </option>

                        <option value="0">
                            Visitante
                        </option>

                    </select>

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
                id="btnGuardarPartido">

                Guardar

            </button>

        </div>

    `;

    document.getElementById('btnGuardarPartido').addEventListener('click', guardarPartido);

    toggleCampoPartido();

}

function toggleCampoPartido() {

    const select = document.getElementById('esLocal');

    const inputCampo = document.getElementById('rivalCampo');

    if (select.value == '1') {

        inputCampo.value = user.campo || '';

        inputCampo.readOnly = true;

    }
    else {

        inputCampo.value = '';

        inputCampo.readOnly = false;

    }

}

async function guardarPartido() {

    const partido = {

        rival_nombre:
            document.getElementById(
                'rivalNombre'
            ).value,

        rival_campo:
            document.getElementById(
                'rivalCampo'
            ).value,

        fecha_part:
            document.getElementById(
                'fechaPartido'
            ).value,

        hora_part:
            document.getElementById(
                'horaPartido'
            ).value,

        foto_campo:
            document.getElementById(
                'fotoCampo'
            ).value,

        esLocal:
            document.getElementById(
                'esLocal'
            ).value,

        id_equipo: user.id_equipo

    };

    try {

        const res = await fetch(

            '/api/partidos',

            {

                method: 'POST',

                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },

                body: JSON.stringify(partido)

            }

        );

        if (!res.ok) {

            throw new Error(
                'Error creando partido'
            );

        }

        bootstrap.Modal
            .getInstance(
                document.getElementById(
                    'modalPartido'
                )
            )
            .hide();

        mostrarAlerta(
            'Partido añadido correctamente',
            'success'
        );

        cargarPartidos();

    }
    catch (err) {

        console.error(err);

    }

}


document.addEventListener('click', e => {

    if (
        e.target.closest('.btn-resultado')
    ) {

        const id = e.target
            .closest('.btn-resultado')
            .dataset.id;

        abrirModalResultado(id);

    }

});

function abrirModalResultado(idPartido) {

    const partido = listaPartidos.find(
        p => p.id_partido == idPartido
    );

    if (
        !partido ||
        !fechaHoraYaPasada(
            partido.fecha_part,
            partido.hora_part
        )
    ) {
        mostrarAlerta(
            'Aún no puedes registrar resultado para este partido',
            'warning'
        );

        return;
    }

    contenidoModalPartido.innerHTML = `

        <div class="modal-header">

            <h5 class="modal-title">

                Registrar resultado

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

                    Goles BALLHUB

                </label>

                <input
                    type="number"
                    id="golesFavor"
                    class="form-control"
                    min="0">

            </div>

            <div class="mb-3">

                <label class="form-label">

                    Goles rival

                </label>

                <input
                    type="number"
                    id="golesContra"
                    class="form-control"
                    min="0">

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
                id="btnGuardarResultado">

                Guardar resultado

            </button>

        </div>

    `;

    new bootstrap.Modal(
        document.getElementById('modalPartido')
    ).show();

    document
        .getElementById('btnGuardarResultado')
        .addEventListener(
            'click',
            () => guardarResultado(idPartido)
        );

}



async function guardarResultado(idPartido) {

    const partido = listaPartidos.find(
        p => p.id_partido == idPartido
    );

    const body = {

        ...partido,

        goles_favor: document.getElementById(
            'golesFavor'
        ).value,

        goles_contra: document.getElementById(
            'golesContra'
        ).value,

        estado: 'finalizado'

    };

    try {

        const res = await fetch(

            `/api/partidos/${idPartido}/resultado`,

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
                'Error actualizando resultado'
            );

        }

        bootstrap.Modal
            .getInstance(
                document.getElementById(
                    'modalPartido'
                )
            )
            .hide();

        mostrarAlerta(
            'Resultado añadido correctamente',
            'success'
        );

        cargarPartidos();

    }
    catch (err) {

        console.error(err);

    }

}

document.addEventListener('click', e => {

    if (
        e.target.closest('.btn-editar-partido')
    ) {

        const id = e.target
            .closest('.btn-editar-partido')
            .dataset.id;

        abrirModalEditarPartido(id);

    }

});

function abrirModalEditarPartido(idPartido) {

    const partido = listaPartidos.find(
        p => p.id_partido == idPartido
    );

    contenidoModalPartido.innerHTML = `

        <div class="modal-header">

            <h5 class="modal-title">

                Editar partido

            </h5>

            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal">
            </button>

        </div>

        <div class="modal-body">

            <form id="formEditarPartido">

                <div class="mb-3">

                    <label class="form-label">
                        Rival
                    </label>

                    <input
                        type="text"
                        id="editRivalNombre"
                        class="form-control"
                        value="${partido.rival_nombre}">

                </div>

                <div class="mb-3">

                    <label class="form-label">
                        Campo
                    </label>

                    <input
                        type="text"
                        id="editRivalCampo"
                        class="form-control"
                        value="${partido.rival_campo || ''}">

                </div>

                <div class="mb-3">

                    <label class="form-label">
                        Fecha
                    </label>

                    <input
                        type="date"
                        id="editFechaPartido"
                        class="form-control"
                        value="${partido.fecha_part.split('T')[0]}">

                </div>

                <div class="mb-3">

                    <label class="form-label">
                        Hora
                    </label>

                    <input
                        type="time"
                        id="editHoraPartido"
                        class="form-control"
                        value="${partido.hora_part || ''}">

                </div>

                <div class="mb-3">

                    <label class="form-label">
                        Foto campo
                    </label>

                    <input
                        type="text"
                        id="editFotoCampo"
                        class="form-control"
                        value="${partido.foto_campo || ''}">

                </div>

                <div class="mb-3">

                    <label class="form-label">
                        Local o visitante
                    </label>

                    <select
                        id="editEsLocal"
                        class="form-select">

                        <option
                            value="1"
                            ${partido.esLocal == 1 ? 'selected' : ''}>

                            Local

                        </option>

                        <option
                            value="0"
                            ${partido.esLocal == 0 ? 'selected' : ''}>

                            Visitante

                        </option>

                    </select>

                </div>

                ${partido.estado === 'finalizado'

            ?

            `
                        <hr>

                        <h6 class="mb-3">
                            Resultado
                        </h6>

                        <div class="mb-3">

                            <label class="form-label">
                                Goles BALLHUB
                            </label>

                            <input
                                type="number"
                                id="editGolesFavor"
                                class="form-control"
                                value="${partido.goles_favor}">

                        </div>

                        <div class="mb-3">

                            <label class="form-label">
                                Goles rival
                            </label>

                            <input
                                type="number"
                                id="editGolesContra"
                                class="form-control"
                                value="${partido.goles_contra}">

                        </div>
                    `

            :

            ''
        }

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
                id="btnActualizarPartido">

                Guardar cambios

            </button>

        </div>

    `;

    new bootstrap.Modal(
        document.getElementById('modalPartido')
    ).show();

    document
        .getElementById('btnActualizarPartido')
        .addEventListener(
            'click',
            () => actualizarPartido(idPartido, partido.estado)
        );

}


async function actualizarPartido(idPartido, estado) {

    const body = {

        rival_nombre:
            document.getElementById(
                'editRivalNombre'
            ).value,

        rival_campo:
            document.getElementById(
                'editRivalCampo'
            ).value,

        fecha_part:
            document.getElementById(
                'editFechaPartido'
            ).value,

        hora_part:
            document.getElementById(
                'editHoraPartido'
            ).value,

        foto_campo:
            document.getElementById(
                'editFotoCampo'
            ).value,

        esLocal:
            document.getElementById(
                'editEsLocal'
            ).value,

        id_equipo: user.id_equipo,

        estado,

        goles_favor:
            estado === 'finalizado'
                ?
                document.getElementById(
                    'editGolesFavor'
                ).value
                :
                0,

        goles_contra:
            estado === 'finalizado'
                ?
                document.getElementById(
                    'editGolesContra'
                ).value
                :
                0

    };

    try {

        const res = await fetch(

            `/api/partidos/${idPartido}`,

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
                'Error actualizando partido'
            );

        }

        bootstrap.Modal
            .getInstance(
                document.getElementById(
                    'modalPartido'
                )
            )
            .hide();

        mostrarAlerta(
            'Partido actualizado',
            'warning'
        );

        cargarPartidos();

    }
    catch (err) {

        console.error(err);

    }

}

document.addEventListener('click', e => {

    if (
        e.target.closest('.btn-borrar-partido')
    ) {

        const id = e.target
            .closest('.btn-borrar-partido')
            .dataset.id;

        borrarPartido(id);

    }

});

async function borrarPartido(idPartido) {

    const confirmar = confirm(
        '¿Seguro que quieres eliminar este partido?'
    );

    if (!confirmar) {
        return;
    }

    try {

        const res = await fetch(

            `/api/partidos/${idPartido}`,

            {

                method: 'DELETE',

                headers: {
                    Authorization: `Bearer ${token}`
                }

            }

        );

        if (!res.ok) {

            throw new Error(
                'Error eliminando partido'
            );

        }

        mostrarAlerta(
            'Partido eliminado',
            'danger'
        );

        cargarPartidos();

    }
    catch (err) {

        console.error(err);

    }

}
