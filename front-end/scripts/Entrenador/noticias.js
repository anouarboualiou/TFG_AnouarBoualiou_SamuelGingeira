const contenedorNoticias = document.getElementById('contenedorNoticias');
const contenidoModalNoticia = document.getElementById('contenidoModalNoticia');
const btnAniadirNoticia = document.getElementById('btnAniadirNoticia');

let listaNoticias = [];

async function cargarNoticias(){

    try{

        const res = await fetch(

            '/api/noticias',

            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }

        );

        const noticias = await res.json();
        

        listaNoticias = noticias.filter(
            n => n.id_equipo == user.id_equipo
        );

        renderNoticias(listaNoticias);

    }
    catch(err){

        console.error(err);

    }

}

function renderNoticias(noticias){

    contenedorNoticias.innerHTML = '';

    if(noticias.length === 0){
        contenedorNoticias.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="bi bi-newspaper fs-1 text-muted"></i>
                <p class="text-muted mt-3">No hay noticias todavía</p>
            </div>
        `;
        return;
    }

    noticias.forEach(noticia => {

        contenedorNoticias.innerHTML += `

            <div class="col-md-4">

                <article class="tarjetaNoticia">

                    <div class="imagen-noticia">

                        <img
                            src="${
                                noticia.foto_noticia ||
                                'https://picsum.photos/600/400'
                            }"
                            alt="noticia">

                    </div>

                    <div class="contenido-noticia">

                        <h5 class="titulo-noticia">

                            ${noticia.titulo}

                        </h5>


                        <h6 class="subtitulo-noticia">

                            ${noticia.subtitulo || ''}

                        </h6>

                        <div class="info-noticia">

                            <span>

                                <i class="bi bi-calendar3 me-2"></i>

                                ${formatearFecha(
                                    noticia.fecha_pub
                                )}

                            </span>

                        </div>

                        <div class="accionesNoticia">

                            <button
                                class="btn btn-warning btn-sm btn-editar-noticia"
                                data-id="${noticia.id_noticia}">

                                <i class="bi bi-pencil"></i>

                            </button>

                            <button
                                class="btn btn-danger btn-sm btn-borrar-noticia"
                                data-id="${noticia.id_noticia}">

                                <i class="bi bi-trash"></i>

                            </button>

                        </div>

                    </div>

                </article>

            </div>

        `;

    });

}

cargarNoticias();

btnAniadirNoticia.addEventListener('click',abrirModalCrearNoticia);

function abrirModalCrearNoticia(){

    contenidoModalNoticia.innerHTML = `

        <div class="modal-header">

            <h5 class="modal-title">

                Añadir noticia

            </h5>

            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal">
            </button>

        </div>

        <div class="modal-body">

            <form id="formNoticia">

                <div class="mb-3">

                    <label class="form-label">
                        Título
                    </label>

                    <input
                        type="text"
                        id="tituloNoticia"
                        class="form-control">

                </div>

                <div class="mb-3">

                    <label class="form-label">
                        Subtítulo
                    </label>

                    <input
                        type="text"
                        id="subtituloNoticia"
                        class="form-control">

                </div>

                <div class="mb-3">

                    <label class="form-label">
                        Descripción
                    </label>

                    <textarea
                        id="descripcionNoticia"
                        class="form-control"
                        rows="5"></textarea>

                </div>

                <div class="mb-3">

                    <label class="form-label">
                        Foto noticia
                    </label>

                    <input
                        type="text"
                        id="fotoNoticia"
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
                id="btnGuardarNoticia">

                Guardar

            </button>

        </div>

    `;

    new bootstrap.Modal(document.getElementById('modalNoticia')).show();

    document.getElementById('btnGuardarNoticia').addEventListener('click',guardarNoticia);

}

async function guardarNoticia(){

    const body = {

        titulo:
            document.getElementById(
                'tituloNoticia'
            ).value,

        subtitulo:
            document.getElementById(
                'subtituloNoticia'
            ).value,
        descripcion:
            document.getElementById(
                'descripcionNoticia'
            ).value,

        foto_noticia:
            document.getElementById(
                'fotoNoticia'
            ).value,

        fecha_pub:new Date().toISOString().split('T')[0],

        id_equipo:user.id_equipo

    };

    try{

        const res = await fetch(

            '/api/noticias',

            {

                method:'POST',

                headers:{
                    'Content-Type':'application/json',
                    Authorization:`Bearer ${token}`
                },

                body:JSON.stringify(body)

            }

        );

        if(!res.ok){

            throw new Error(
                'Error creando noticia'
            );

        }

        bootstrap.Modal
            .getInstance(
                document.getElementById(
                    'modalNoticia'
                )
            )
            .hide();

        mostrarAlerta(
            'Noticia añadida',
            'success'
        );

        cargarNoticias();

    }
    catch(err){

        console.error(err);

    }

}

document.addEventListener('click', e => {

    if(
        e.target.closest('.btn-editar-noticia')
    ){

        const id = e.target
            .closest('.btn-editar-noticia')
            .dataset.id;

        abrirModalEditarNoticia(id);

    }

});

function abrirModalEditarNoticia(idNoticia){

    const noticia = listaNoticias.find(
        n => n.id_noticia == idNoticia
    );

    contenidoModalNoticia.innerHTML = `

        <div class="modal-header">

            <h5 class="modal-title">

                Editar noticia

            </h5>

            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal">
            </button>

        </div>

        <div class="modal-body">

            <form>

                <div class="mb-3">

                    <label class="form-label">
                        Título
                    </label>

                    <input
                        type="text"
                        id="editTituloNoticia"
                        class="form-control"
                        value="${noticia.titulo}">

                    <input type="hidden" id="editFechaPub" value="${noticia.fecha_pub}">

                </div>
                

                <div class="mb-3">

                    <label class="form-label">
                        Subtítulo
                    </label>

                    <input
                        type="text"
                        id="editSubtituloNoticia"
                        class="form-control"
                        value="${noticia.subtitulo || ''}">

                </div>

                <div class="mb-3">

                    <label class="form-label">
                        Descripción
                    </label>

                    <textarea
                        id="editDescripcionNoticia"
                        class="form-control"
                        rows="5">${noticia.descripcion}</textarea>

                </div>

                <div class="mb-3">

                    <label class="form-label">
                        Foto noticia
                    </label>

                    <input
                        type="text"
                        id="editFotoNoticia"
                        class="form-control"
                        value="${noticia.foto_noticia || ''}">

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
                id="btnActualizarNoticia">

                Guardar cambios

            </button>

        </div>

    `;

    new bootstrap.Modal(
        document.getElementById('modalNoticia')
    ).show();

    document
        .getElementById('btnActualizarNoticia')
        .addEventListener(
            'click',
            () => actualizarNoticia(idNoticia)
        );

}

async function actualizarNoticia(idNoticia){

    const body = {

        titulo:
            document.getElementById(
                'editTituloNoticia'
            ).value,

        subtitulo:
            document.getElementById(
                'editSubtituloNoticia'
            ).value,

        fecha_pub: document.getElementById('editFechaPub').value,


        descripcion:
            document.getElementById(
                'editDescripcionNoticia'
            ).value,

        foto_noticia:
            document.getElementById(
                'editFotoNoticia'
            ).value,

        id_equipo:user.id_equipo

    };

    try{

        const res = await fetch(

            `/api/noticias/${idNoticia}`,

            {

                method:'PUT',

                headers:{
                    'Content-Type':'application/json',
                    Authorization:`Bearer ${token}`
                },

                body:JSON.stringify(body)

            }

        );

        if(!res.ok){

            throw new Error(
                'Error actualizando noticia'
            );

        }

        bootstrap.Modal
            .getInstance(
                document.getElementById(
                    'modalNoticia'
                )
            )
            .hide();

        mostrarAlerta(
            'Noticia actualizada',
            'warning'
        );

        cargarNoticias();

    }
    catch(err){

        console.error(err);

    }

}

document.addEventListener('click', e => {

    if(
        e.target.closest('.btn-borrar-noticia')
    ){

        const id = e.target
            .closest('.btn-borrar-noticia')
            .dataset.id;

        borrarNoticia(id);

    }

});

async function borrarNoticia(idNoticia){

    const confirmar = confirm(
        '¿Eliminar noticia?'
    );

    if(!confirmar){
        return;
    }

    try{

        const res = await fetch(

            `/api/noticias/${idNoticia}`,

            {

                method:'DELETE',

                headers:{
                    Authorization:`Bearer ${token}`
                }

            }

        );

        if(!res.ok){

            throw new Error(
                'Error eliminando noticia'
            );

        }

        mostrarAlerta(
            'Noticia eliminada',
            'danger'
        );

        cargarNoticias();

    }
    catch(err){

        console.error(err);

    }

}