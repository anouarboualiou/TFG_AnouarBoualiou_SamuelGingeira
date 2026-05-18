const tablaEntrenadores = document.getElementById('tablaEntrenadores');
const btnAniadirEntrenador = document.getElementById('btnAniadirEntrenador');
const contenidoModalEntrenador = document.getElementById('contenidoModalEntrenador');

let listaEntrenadores = [];

// GET ENTRENADORES
async function cargarEntrenadores() {

    try {

        const res = await fetch('/api/entrenadores', {

            headers: {
                Authorization: `Bearer ${token}`
            }

        });

        const entrenadores = await res.json();
        listaEntrenadores = entrenadores;
        renderEntrenadores(entrenadores);
        actualizarEstadisticas();

    }
    catch (err) {

        console.error(err);

    }

}

// RENDER
function renderEntrenadores(entrenadores) {

    tablaEntrenadores.innerHTML = '';

    entrenadores.forEach(entrenador => {

        tablaEntrenadores.innerHTML += `

            <tr>

                <!-- FOTO -->
                <td>

                    <img
                        src="${entrenador.foto_perfil || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}"
                        width="50"
                        height="50"
                        style="object-fit:cover; border-radius:50%;">

                </td>

                <!-- NOMBRE -->
                <td>

                    <strong>
                        ${entrenador.nombre} ${entrenador.apellidos}
                    </strong>

                </td>

                <!-- FECHA -->
                <td>

                    ${formatearFecha(entrenador.fecha_nacim)}

                </td>

                <!-- EQUIPO -->
                <td>

                    ${entrenador.id_equipo
                ?
                `<span class="badge bg-success">
                            ${entrenador.nombre_equipo || 'Con equipo'}
                        </span>`
                :
                `<span class="badge bg-danger">
                            Sin equipo
                        </span>`
            }

                </td>

                <!-- USUARIO -->
                <td>

                    ${
                        entrenador.id_usuario
                        ?
                        `<span class="badge bg-success">
                            ${entrenador.email}
                        </span>`
                        :
                        `<span class="badge bg-secondary">
                            Sin credenciales
                        </span>`
                    }

                </td>

                <!-- ACCIONES -->
                <td class="text-center actions-cell">

                    <!-- CREDENCIALES -->
                    <button
                        class="btn btn-primary btn-sm btn-credenciales"
                        data-id="${entrenador.id_entrenador}"
                        data-bs-toggle="modal"
                        data-bs-target="#modalEntrenador">

                        <i class="bi bi-key"></i>

                    </button>

                    <!-- ASIGNAR -->
                    <button
                        class="btn btn-success btn-sm text-white btn-asignar-equipo"
                        data-id="${entrenador.id_entrenador}"
                        data-bs-toggle="modal"
                        data-bs-target="#modalEntrenador">

                        <i class="bi bi-diagram-3"></i>

                    </button>

                    <!-- EDITAR -->
                    <button
                        class="btn btn-warning btn-sm btn-editar-entrenador"
                        data-id="${entrenador.id_entrenador}"
                        data-bs-toggle="modal"
                        data-bs-target="#modalEntrenador">

                        <i class="bi bi-pencil"></i>

                    </button>

                    <!-- BORRAR -->
                    <button
                        class="btn btn-danger btn-sm btn-borrar-entrenador"
                        data-id="${entrenador.id_entrenador}">

                        <i class="bi bi-trash"></i>

                    </button>

                </td>

            </tr>

        `;

    });

}

// FORMATEAR FECHA
function formatearFecha(fecha) {

    return new Date(fecha)
        .toLocaleDateString('es-ES');

}

// INIT
cargarEntrenadores();


btnAniadirEntrenador.addEventListener(
    'click',
    abrirModalCrearEntrenador
);

function abrirModalCrearEntrenador() {

    contenidoModalEntrenador.innerHTML = `

        <div class="modal-header">

            <h5 class="modal-title">

                Crear entrenador

            </h5>

            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal">
            </button>

        </div>

        <div class="modal-body">

            <form id="formCrearEntrenador">

                <!-- NOMBRE -->
                <div class="mb-3">

                    <label class="form-label">
                        Nombre
                    </label>

                    <input
                        type="text"
                        id="nombreEntrenador"
                        class="form-control"
                        required>

                </div>

                <!-- APELLIDOS -->
                <div class="mb-3">

                    <label class="form-label">
                        Apellidos
                    </label>

                    <input
                        type="text"
                        id="apellidosEntrenador"
                        class="form-control"
                        required>

                </div>

                <!-- FECHA -->
                <div class="mb-3">

                    <label class="form-label">
                        Fecha nacimiento
                    </label>

                    <input
                        type="date"
                        id="fechaEntrenador"
                        class="form-control"
                        required>

                </div>

                <!-- FOTO -->
                <div class="mb-3">

                    <label class="form-label">
                        Foto perfil
                    </label>

                    <input
                        type="text"
                        id="fotoEntrenador"
                        class="form-control"
                        placeholder="URL de imagen">

                </div>

                <!-- EQUIPO -->
                <div class="mb-3">

                    <label class="form-label">
                        Equipo
                    </label>

                    <select
                        id="equipoEntrenador"
                        class="form-select">

                        <option value="">
                            Sin equipo
                        </option>

                    </select>

                </div>

            </form>

        </div>

        <div class="modal-footer">

            <button
                type="button"
                class="btn btn-danger"
                data-bs-dismiss="modal">

                Cancelar

            </button>

            <button
                type="button"
                class="btn btn-success text-white"
                id="btnGuardarEntrenador">

                Guardar

            </button>

        </div>

    `;

    cargarEquiposDisponibles();

}

function cargarEquiposDisponibles() {

    const select = document.getElementById('equipoEntrenador');

    const equiposDisponibles = listaEquipos.filter(
        equipo => !equipo.entrenador_nombre
    );

    equiposDisponibles.forEach(equipo => {

        select.innerHTML += `

            <option value="${equipo.id_equipo}">

                ${equipo.nombre}

            </option>

        `;

    });

}

document.addEventListener('click', function (e) {

    if (e.target.id === 'btnGuardarEntrenador') {

        crearEntrenador();

    }

});

tablaEntrenadores.addEventListener(
    'click',
    manejarClicksEntrenadores
);

function manejarClicksEntrenadores(e) {

    const botonEditar = e.target.closest('.btn-editar-entrenador')
    const botonAsignar = e.target.closest('.btn-asignar-equipo')
    const botonBorrar = e.target.closest('.btn-borrar-entrenador')
    const botonCredenciales = e.target.closest('.btn-credenciales')

    if (botonEditar) {
        abrirModalEditarEntrenador(botonEditar)
    }

    if (botonAsignar) {
        abrirModalAsignarEquipo(botonAsignar)
    }

    if (botonBorrar) {
        borrarEntrenador(botonBorrar)
    }

    if (botonCredenciales) {
        abrirModalCredenciales(botonCredenciales);
    }

}

async function crearEntrenador() {

    const nombre = document
        .getElementById('nombreEntrenador')
        .value;

    const apellidos = document
        .getElementById('apellidosEntrenador')
        .value;

    const fecha_nacim = document
        .getElementById('fechaEntrenador')
        .value;

    const foto_perfil = document
        .getElementById('fotoEntrenador')
        .value;

    const id_equipo = document
        .getElementById('equipoEntrenador')
        .value || null;

    try {

        const res = await fetch('/api/entrenadores', {

            method: 'POST',

            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },

            body: JSON.stringify({
                nombre,
                apellidos,
                fecha_nacim,
                foto_perfil,
                id_equipo
            })

        });

        if (!res.ok) {

            throw new Error(
                'Error al crear entrenador'
            );

        }

        // cerrar modal
        bootstrap.Modal
            .getInstance(
                document.getElementById('modalEntrenador')
            )
            .hide();

        // recargar
        cargarEntrenadores();
        cargarEquipos();

    }
    catch (err) {

        console.error(err);

    }

}


function abrirModalEditarEntrenador(boton) {

    const id = boton.dataset.id;

    const entrenador = listaEntrenadores.find(
        entrenador => entrenador.id_entrenador == id
    );

    contenidoModalEntrenador.innerHTML = `

        <div class="modal-header">

            <h5 class="modal-title">

                Editar entrenador

            </h5>

            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal">
            </button>

        </div>

        <div class="modal-body">

            <form id="formEditarEntrenador">

                <input
                    type="hidden"
                    id="idEntrenadorEditar"
                    value="${entrenador.id_entrenador}">

                <input
                    type="hidden"
                    id="idEquipoEntrenadorEditar"
                    value="${entrenador.id_equipo || ''}">

                <!-- NOMBRE -->
                <div class="mb-3">

                    <label class="form-label">
                        Nombre
                    </label>

                    <input
                        type="text"
                        id="editarNombreEntrenador"
                        class="form-control"
                        value="${entrenador.nombre}"
                        required>

                </div>

                <!-- APELLIDOS -->
                <div class="mb-3">

                    <label class="form-label">
                        Apellidos
                    </label>

                    <input
                        type="text"
                        id="editarApellidosEntrenador"
                        class="form-control"
                        value="${entrenador.apellidos}"
                        required>

                </div>

                <!-- FECHA -->
                <div class="mb-3">

                    <label class="form-label">
                        Fecha nacimiento
                    </label>

                    <input
                        type="date"
                        id="editarFechaEntrenador"
                        class="form-control"
                        value="${entrenador.fecha_nacim?.split('T')[0]}"
                        required>

                </div>

                <!-- FOTO -->
                <div class="mb-3">

                    <label class="form-label">
                        Foto perfil
                    </label>

                    <input
                        type="text"
                        id="editarFotoEntrenador"
                        class="form-control"
                        value="${entrenador.foto_perfil || ''}">

                </div>

            </form>

        </div>

        <div class="modal-footer">

            <button
                type="button"
                class="btn btn-danger"
                data-bs-dismiss="modal">

                Cancelar

            </button>

            <button
                type="button"
                class="btn btn-success text-white"
                id="btnGuardarCambiosEntrenador">

                Guardar cambios

            </button>

        </div>

    `;

    document
        .getElementById(
            'btnGuardarCambiosEntrenador'
        )
        .addEventListener(
            'click',
            editarEntrenador
        );

}


async function editarEntrenador() {

    const id = document
        .getElementById(
            'idEntrenadorEditar'
        )
        .value;

    const nombre = document
        .getElementById(
            'editarNombreEntrenador'
        )
        .value;

    const apellidos = document
        .getElementById(
            'editarApellidosEntrenador'
        )
        .value;

    const fecha_nacim = document
        .getElementById(
            'editarFechaEntrenador'
        )
        .value;

    const foto_perfil = document
        .getElementById(
            'editarFotoEntrenador'
        )
        .value;

    const id_equipo = document
        .getElementById(
            'idEquipoEntrenadorEditar'
        )
        .value || null;

    try {

        const res = await fetch(

            `/api/entrenadores/${id}`,

            {

                method: 'PUT',

                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },

                body: JSON.stringify({
                    nombre,
                    apellidos,
                    fecha_nacim,
                    id_equipo,
                    foto_perfil
                })

            }

        );

        if (!res.ok) {

            throw new Error(
                'Error al editar entrenador'
            );

        }

        bootstrap.Modal
            .getInstance(
                document.getElementById(
                    'modalEntrenador'
                )
            )
            .hide();

        cargarEntrenadores();

    }
    catch (err) {

        console.error(err);

    }

}


function abrirModalAsignarEquipo(boton) {

    const id = boton.dataset.id;

    const entrenador = listaEntrenadores.find(
        entrenador => entrenador.id_entrenador == id
    );

    contenidoModalEntrenador.innerHTML = `

        <div class="modal-header">

            <h5 class="modal-title">

                Asignar equipo

            </h5>

            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal">
            </button>

        </div>

        <div class="modal-body">

            <input
                type="hidden"
                id="idEntrenadorAsignar"
                value="${entrenador.id_entrenador}">

            <div class="mb-3">

                <label class="form-label">

                    Entrenador

                </label>

                <input
                    type="text"
                    class="form-control"
                    value="${entrenador.nombre} ${entrenador.apellidos}"
                    disabled>

            </div>

            <div class="mb-3">

                <label class="form-label">

                    Equipo

                </label>

                <select
                    id="selectEquipoAsignar"
                    class="form-select">

                    <option value="">
                        Sin equipo
                    </option>

                </select>

            </div>

        </div>

        <div class="modal-footer">

            <button
                type="button"
                class="btn btn-danger"
                data-bs-dismiss="modal">

                Cancelar

            </button>

            <button
                type="button"
                class="btn btn-success text-white"
                id="btnGuardarEquipoAsignado">

                Guardar

            </button>

        </div>

    `;

    cargarEquiposAsignacion(entrenador);

    document
        .getElementById(
            'btnGuardarEquipoAsignado'
        )
        .addEventListener(
            'click',
            guardarEquipoAsignado
        );

}

function cargarEquiposAsignacion(entrenador) {

    const select = document.getElementById(
        'selectEquipoAsignar'
    );

    listaEquipos.forEach(equipo => {

        const ocupado = equipo.entrenador_nombre;

        const esSuEquipo =
            entrenador.id_equipo == equipo.id_equipo;

        if (!ocupado || esSuEquipo) {

            select.innerHTML += `

                <option
                    value="${equipo.id_equipo}"
                    ${esSuEquipo ? 'selected' : ''}>

                    ${equipo.nombre}

                </option>

            `;

        }

    });

}

async function guardarEquipoAsignado() {

    const id = document
        .getElementById(
            'idEntrenadorAsignar'
        )
        .value;

    const entrenador = listaEntrenadores.find(
        entrenador => entrenador.id_entrenador == id
    );

    const id_equipo = document
        .getElementById(
            'selectEquipoAsignar'
        )
        .value || null;

    try {

        const res = await fetch(

            `/api/entrenadores/${id}`,

            {

                method: 'PUT',

                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },

                body: JSON.stringify({

                    nombre: entrenador.nombre,
                    apellidos: entrenador.apellidos,
                    fecha_nacim: entrenador.fecha_nacim,
                    foto_perfil: entrenador.foto_perfil,
                    id_equipo

                })

            }

        );

        if (!res.ok) {

            throw new Error(
                'Error al asignar equipo'
            );

        }

        bootstrap.Modal
            .getInstance(
                document.getElementById(
                    'modalEntrenador'
                )
            )
            .hide();

        cargarEntrenadores();
        cargarEquipos();

    }
    catch (err) {

        console.error(err);

    }

}

async function borrarEntrenador(boton) {

    const id = boton.dataset.id;

    const confirmar = confirm(

        '¿Seguro que quieres eliminar este entrenador?'

    );

    if (!confirmar) return;

    try {

        const res = await fetch(

            `/api/entrenadores/${id}`,

            {

                method: 'DELETE',

                headers: {
                    Authorization: `Bearer ${token}`
                }

            }

        );

        if (!res.ok) {

            throw new Error(
                'Error al eliminar entrenador'
            );

        }

        cargarEntrenadores();
        cargarEquipos();

    }
    catch (err) {

        console.error(err);

    }

}

function abrirModalCredenciales(boton) {

    const id = boton.dataset.id;

    const entrenador = listaEntrenadores.find(
        entrenador => entrenador.id_entrenador == id
    );

    contenidoModalEntrenador.innerHTML = `

        <div class="modal-header">

            <h5 class="modal-title">

                ${entrenador.id_usuario
            ? 'Editar credenciales'
            : 'Crear credenciales'}

            </h5>

            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal">
            </button>

        </div>

        <div class="modal-body">

            <input
                type="hidden"
                id="idEntrenadorCredenciales"
                value="${entrenador.id_entrenador}">

            <input
                type="hidden"
                id="idUsuarioEditar"
                value="${entrenador.id_usuario || ''}">

            <!-- EMAIL -->
            <div class="mb-3">

                <label class="form-label">
                    Email
                </label>

                <input
                    type="email"
                    id="emailCredenciales"
                    class="form-control"
                    value="${entrenador.email || ''}"
                    required>

            </div>

            <!-- PASSWORD -->
            <div class="mb-3">

                <label class="form-label">
                    Password
                </label>

                <input
                    type="password"
                    id="passwordCredenciales"
                    class="form-control"
                    placeholder="Nueva contraseña">
                
                <div id="passwordFeedback" class="invalid-feedback">
                    La contraseña debe tener al menos 8 caracteres.
                </div>

            </div>

        </div>

        <div class="modal-footer">

            <button
                type="button"
                class="btn btn-danger"
                data-bs-dismiss="modal">

                Cancelar

            </button>

            <button
                type="button"
                class="btn btn-success text-white"
                id="btnGuardarCredenciales">

                Guardar

            </button>

        </div>

    `;

    document
        .getElementById(
            'btnGuardarCredenciales'
        )
        .addEventListener(
            'click',
            guardarCredenciales
        );

}

async function guardarCredenciales() {

    const id_entrenador = document.getElementById('idEntrenadorCredenciales').value;
    const id_usuario = document.getElementById('idUsuarioEditar').value;
    const email = document.getElementById('emailCredenciales').value;
    const password = document.getElementById('passwordCredenciales').value;
    const inputPassword = document.getElementById('passwordCredenciales');

    // Validación contraseña
    if (password.length < 8) {
        inputPassword.classList.add('is-invalid');
        return;
    } else {
        inputPassword.classList.remove('is-invalid');
    }

    try {

        // CREAR
        if (!id_usuario) {

            const res = await fetch(
                '/api/usuarios',
                {

                    method: 'POST',

                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },

                    body: JSON.stringify({

                        email,
                        password,
                        rol: 'entrenador',
                        id_entrenador

                    })

                }
            );

            if (!res.ok) {

                throw new Error(
                    'Error al crear usuario'
                );

            }

        }

        // EDITAR
        else {

            const res = await fetch(
                `/api/usuarios/${id_usuario}`,
                {

                    method: 'PUT',

                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },

                    body: JSON.stringify({

                        email,
                        password,
                        rol: 'entrenador',
                        id_entrenador

                    })

                }
            );

            if (!res.ok) {

                throw new Error(
                    'Error al editar usuario'
                );

            }

        }

        bootstrap.Modal
            .getInstance(
                document.getElementById(
                    'modalEntrenador'
                )
            )
            .hide();

        cargarEntrenadores();

    }
    catch (err) {

        console.error(err);

    }

}
