const tablaEquipos = document.getElementById('tablaEquipos');
const btnAniadirEquipo = document.getElementById('btnAniadirEquipo');

let listaEquipos = [];

// CARGAR EQUIPOS
async function cargarEquipos() {

    try {

        const res = await fetch('/api/equipos', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const equipos = await res.json();

        listaEquipos = equipos;
        renderEquipos(equipos);
        actualizarEstadisticas();

    }
    catch (err) {

        console.error(err);

    }

}

// RENDER TABLA
function renderEquipos(equipos) {

    tablaEquipos.innerHTML = '';

    equipos.forEach(equipo => {

        tablaEquipos.innerHTML += `

            <tr>

                <td><strong>${equipo.nombre}</strong></td>

                <td>${equipo.campo}</td>

                <td>
                    ${equipo.entrenador_nombre
                        ? `<span class="badge bg-success">${equipo.entrenador_nombre} ${equipo.entrenador_apellidos}</span>`
                        : `<span class="badge bg-secondary">Sin entrenador</span>`
                    }
                </td>

                <td class="text-center actions-cell">

                    <button class="btn btn-warning btn-sm btn-editar"
                        data-id="${equipo.id_equipo}"
                        data-bs-toggle="modal"
                        data-bs-target="#modalEquipo">
                        <i class="bi bi-pencil"></i>
                    </button>

                    <button 
                        class="btn btn-danger btn-sm btn-borrar"
                        data-id="${equipo.id_equipo}">
                        <i class="bi bi-trash"></i>
                    </button>

                </td>

            </tr>

        `;
    });
}

// INIT
cargarEquipos();

const contenidoModalEquipo = document.getElementById('contenidoModalEquipo');

// MODAL CREAR
function abrirModalCrear() {

    contenidoModalEquipo.innerHTML = `

        <div class="modal-header">

            <h5 class="modal-title">
                Crear equipo
            </h5>

            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal">
            </button>

        </div>

        <div class="modal-body">

            <form id="formCrearEquipo">

                <div class="mb-3">

                    <label class="form-label">
                        Nombre
                    </label>

                    <input
                        type="text"
                        id="nombreEquipo"
                        class="form-control"
                        required>

                </div>

                <div class="mb-3">

                    <label class="form-label">
                        Campo
                    </label>

                    <input
                        type="text"
                        id="campoEquipo"
                        class="form-control"
                        required>

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
                id="btnGuardarEquipo">

                Guardar

            </button>

        </div>

    `;
}

btnAniadirEquipo.addEventListener('click', abrirModalCrear);

document.addEventListener('click', function (e) {

    if (e.target.id === 'btnGuardarEquipo') {

        crearEquipo();

    }

});


tablaEquipos.addEventListener('click', manejarClicksTabla);

function manejarClicksTabla(e) {

    const botonEditar = e.target.closest('.btn-editar');
    const botonBorrar = e.target.closest('.btn-borrar');

    if (botonEditar) {
        abrirModalEditar(botonEditar);
    }

    if (botonBorrar) {
        borrarEquipo(botonBorrar);
    }

}

// MODAL EDITAR
function abrirModalEditar(boton) {

    const id = boton.dataset.id;

    const equipo = listaEquipos.find(
        equipo => equipo.id_equipo == id
    );

    contenidoModalEquipo.innerHTML = `

        <div class="modal-header">

            <h5 class="modal-title">
                Editar equipo
            </h5>

            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal">
            </button>

        </div>

        <div class="modal-body">

            <form id="formEditarEquipo">

                <input
                    type="hidden"
                    id="idEquipoEditar"
                    value="${equipo.id_equipo}">

                <div class="mb-3">

                    <label class="form-label">
                        Nombre
                    </label>

                    <input
                        type="text"
                        id="editarNombreEquipo"
                        class="form-control"
                        value="${equipo.nombre}">

                </div>

                <div class="mb-3">

                    <label class="form-label">
                        Campo
                    </label>

                    <input
                        type="text"
                        id="editarCampoEquipo"
                        class="form-control"
                        value="${equipo.campo}">

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
                id="btnGuardarCambios">

                Guardar cambios

            </button>

        </div>

    `;


    // EVENTO PUT
    document
        .getElementById('btnGuardarCambios')
        .addEventListener('click', editarEquipo);

}

async function crearEquipo() {

    const nombre = document.getElementById('nombreEquipo').value;

    const campo = document.getElementById('campoEquipo').value;

    try {

        const res = await fetch('/api/equipos', {

            method: 'POST',

            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },

            body: JSON.stringify({
                nombre,
                campo
            })

        });

        if (!res.ok) {

            throw new Error('Error al crear equipo');

        }

        // cerrar modal
        bootstrap.Modal
            .getInstance(document.getElementById('modalEquipo'))
            .hide();

        mostrarAlerta(
            'Equipo añadido',
            'success'
        )

        // recargar tabla
        cargarEquipos();

    }
    catch (err) {

        console.error(err);

    }

}

async function editarEquipo() {

    const id = document.getElementById('idEquipoEditar').value;

    const nombre = document.getElementById('editarNombreEquipo').value;

    const campo = document.getElementById('editarCampoEquipo').value;

    try {

        const res = await fetch(`/api/equipos/${id}`, {

            method: 'PUT',

            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },

            body: JSON.stringify({
                nombre,
                campo
            })

        });

        if (!res.ok) {
            throw new Error('Error al editar');
        }

        // cerrar modal
        bootstrap.Modal
            .getInstance(document.getElementById('modalEquipo'))
            .hide();

        mostrarAlerta(
            'Equipo actualizado',
            'warning'
        )

        cargarEquipos();

    }
    catch (err) {

        console.error(err);

    }

}

async function borrarEquipo(boton) {

    const id = boton.dataset.id;

    const confirmar = confirm(
        '¿Seguro que quieres eliminar este equipo?'
    );

    if (!confirmar) return;

    try {

        const res = await fetch(`/api/equipos/${id}`, {

            method: 'DELETE',

            headers: {
                Authorization: `Bearer ${token}`
            }

        });

        if (!res.ok) {

            throw new Error('Error al eliminar');

        }

        mostrarAlerta(
            'Equipo borrado',
            'danger'
        )

        cargarEquipos();

    }
    catch (err) {

        console.error(err);

    }

}

