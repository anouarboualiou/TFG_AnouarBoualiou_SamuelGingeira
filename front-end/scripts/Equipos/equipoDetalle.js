document.addEventListener("DOMContentLoaded", cargarEquipo)

let graficoAsistencia = null

async function cargarEquipo() {

    const id = window.location.pathname.split('/').pop()
    console.log(id)

    if (!id) return

    try {

        const response = await fetch(`/api/equipos/${id}`)

        if (!response.ok) {
            throw new Error("Equipo no encontrado")
        }

        const equipo = await response.json()

        cargarInformacionEquipo(equipo)

        cargarEstadisticas(equipo)

        cargarJugadores(equipo.jugadores || [])

        cargarPartidos(equipo.partidos || [])

        cargarNoticias(equipo.noticias || [])

        cargarEntrenamientos(
            equipo.entrenamientos_lista || []
        )

        cargarGrafica(equipo.asistencias || [])

    } catch (error) {

        console.error(error)

        mostrarError()
    }
}

/* =========================================
   INFORMACION GENERAL
========================================= */

function cargarInformacionEquipo(equipo) {

    const entrenador =
        `${equipo.entrenador_nombre || ''} ${equipo.entrenador_apellidos || ''}`

    // PRINCIPAL

    const nombreEquipo =
        document.getElementById("nombreEquipo")

    if (nombreEquipo) {
        nombreEquipo.textContent = equipo.nombre || "Equipo"
    }

    const campoEquipo =
        document.getElementById("campoEquipo")

    if (campoEquipo) {
        campoEquipo.textContent = equipo.campo || "-"
    }

    const entrenadorEquipo =
        document.getElementById("entrenadorEquipo")

    if (entrenadorEquipo) {
        entrenadorEquipo.textContent = entrenador
    }

    // LATERAL

    const nombreEquipoLateral =
        document.getElementById("nombreEquipoLateral")

    if (nombreEquipoLateral) {
        nombreEquipoLateral.textContent = equipo.nombre || "Equipo"
    }

    const campoEquipoLateral =
        document.getElementById("campoEquipoLateral")

    if (campoEquipoLateral) {
        campoEquipoLateral.textContent = equipo.campo || "-"
    }

    const entrenadorEquipoLateral =
        document.getElementById("entrenadorEquipoLateral")

    if (entrenadorEquipoLateral) {
        entrenadorEquipoLateral.textContent = entrenador
    }

    const ultimoPartido =
        document.getElementById("ultimoPartido")

    if (ultimoPartido) {
        ultimoPartido.textContent =
            equipo.ultimo_partido || "-"
    }

    const ultimoEntrenamiento =
        document.getElementById("ultimoEntrenamiento")

    if (ultimoEntrenamiento) {
        ultimoEntrenamiento.textContent =
            equipo.ultimo_entrenamiento || "-"
    }
}

/* =========================================
   ESTADISTICAS
========================================= */

function cargarEstadisticas(equipo) {

    const jugadores =
        equipo.jugadores?.length || 0

    const partidos =
        equipo.partidos?.length || 0

    const entrenamientos =
        equipo.entrenamientos || 0

    const estadisticaJugadores =
        document.getElementById("estadisticaJugadores")

    if (estadisticaJugadores) {
        estadisticaJugadores.textContent = jugadores
    }

    const estadisticaPartidos =
        document.getElementById("estadisticaPartidos")

    if (estadisticaPartidos) {
        estadisticaPartidos.textContent = partidos
    }

    const estadisticaEntrenamientos =
        document.getElementById("estadisticaEntrenamientos")

    if (estadisticaEntrenamientos) {
        estadisticaEntrenamientos.textContent = entrenamientos
    }
}

/* =========================================
   JUGADORES
========================================= */

function cargarJugadores(jugadores) {

    const contenedor =
        document.getElementById("contenedorJugadores")

    if (!contenedor) return

    contenedor.innerHTML = ""

    if (jugadores.length === 0) {

        contenedor.innerHTML = `
            <div class="col-12">

                <div class="alert alert-light border rounded-4">

                    No hay jugadores registrados

                </div>

            </div>
        `

        return
    }

    jugadores.forEach(jugador => {

        contenedor.innerHTML += `

            <div class="col-12 col-md-6 col-xl-3">

                <div class="cardJugador">

                    <div class="text-center mb-3">

                        <img
                            src="${jugador.foto_perfil ||
                                'https://cdn-icons-png.flaticon.com/512/149/149071.png'}"

                            class="fotoJugadorCard">

                    </div>

                    <div class="text-center mb-3">

                        <div class="nombreJugador">

                            ${jugador.nombre}
                            ${jugador.apellidos || ''}

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

                </div>

            </div>
        `
    })
}

function calcularEdad(fechaNacimiento) {

    if (!fechaNacimiento) return '-'

    const hoy = new Date()

    const nacimiento = new Date(fechaNacimiento)

    let edad =
        hoy.getFullYear() - nacimiento.getFullYear()

    const mes =
        hoy.getMonth() - nacimiento.getMonth()

    if (
        mes < 0 ||
        (mes === 0 && hoy.getDate() < nacimiento.getDate())
    ) {
        edad--
    }

    return edad
}

/* =========================================
   PARTIDOS
========================================= */

function cargarPartidos(partidos) {

    const contenedor =
        document.getElementById("contenedorPartidos")

    if (!contenedor) return

    contenedor.innerHTML = `
        <div class="row g-4"></div>
    `

    const row = contenedor.querySelector('.row')

    if (partidos.length === 0) {

        row.innerHTML = `
            <div class="col-12">

                <div class="alert alert-light border rounded-4">

                    No hay partidos registrados

                </div>

            </div>
        `

        return
    }

    partidos.forEach(p => {

        const resultadoClase =

            p.estado === 'finalizado'

                ?

                p.goles_favor > p.goles_contra
                    ? 'victoria'

                    : p.goles_favor < p.goles_contra
                        ? 'derrota'

                        : 'empate'

                :

                ''

        row.innerHTML += `

        <div class="col-lg-6">

            <article class="tarjeta-partido ${resultadoClase}">

                <header
                    class="encabezado-partido"

                    style="
                        background-image:
                        linear-gradient(
                            rgba(0,0,0,0.45),
                            rgba(0,0,0,0.75)
                        ),
                        url('${p.foto_campo ||
                            'https://images.unsplash.com/photo-1486286701208-1d58e9338013?q=80&w=1200&auto=format&fit=crop'
                        }');
                    ">

                    <div class="overlayResultado">

                        <div class="estadoPartido">

                            ${
                                p.estado === 'finalizado'

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

                                ${p.nombre_equipo}

                            </div>

                            <div class="resultadoCentral
                                ${p.estado === 'finalizado'
                                    ? 'resultado'
                                    : 'vs'
                                }">

                                ${
                                    p.estado === 'finalizado'

                                        ?

                                        `${p.goles_favor} - ${p.goles_contra}`

                                        :

                                        'VS'
                                }

                            </div>

                            <div class="equipoNombre">

                                ${p.rival_nombre}

                            </div>

                        </div>

                        ${
                            p.estado === 'finalizado'

                                ?

                                `
                                <div class="indicadorResultado">

                                    ${
                                        p.goles_favor > p.goles_contra

                                            ?

                                            `
                                            <span class="pillResultado victoria">

                                                Victoria

                                            </span>
                                            `

                                            :

                                            p.goles_favor < p.goles_contra

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

                        ${formatearFecha(p.fecha)}

                    </p>

                    <p>

                        <i class="bi bi-clock text-primary me-2"></i>

                        ${p.hora?.slice(0, 5) || '--:--'}

                    </p>

                    <p>

                        <i class="bi bi-geo-alt text-primary me-2"></i>

                        ${p.campo || 'Sin campo'}

                    </p>

                </div>

            </article>

        </div>
        `
    })
}

/* =========================================
   NOTICIAS
========================================= */

function cargarNoticias(noticias) {

    const contenedor =
        document.getElementById("contenedorNoticias")

    if (!contenedor) return

    contenedor.innerHTML = ""

    if (noticias.length === 0) {

        contenedor.innerHTML = `
            <div class="col-12">

                <div class="alert alert-light border rounded-4">

                    No hay noticias disponibles

                </div>

            </div>
        `

        return
    }

    noticias.forEach(n => {

        contenedor.innerHTML += `

            <div class="col-md-4">

                <article class="tarjetaNoticia">

                    <div class="imagen-noticia">

                        <img
                            src="${
                                n.foto ||

                                'https://images.unsplash.com/photo-1508098682722-e99c643e7485?q=80&w=1200&auto=format&fit=crop'
                            }">

                      

                    </div>

                    <div class="contenido-noticia">

                        <h5 class="titulo-noticia">

                            ${n.titulo}

                        </h5>

                        <p class="texto-noticia">

                            ${n.subtitulo || ''}

                        </p>

                        <div class="info-noticia">

                            <span>

                                ${
                                    n.fecha
                                        ? new Date(n.fecha)
                                            .toLocaleDateString("es-ES")
                                        : '-'
                                }

                            </span>

                        </div>

                        <a 
                            href="/noticias/${n.id_noticia}"

                            class="btn btn-primary btn-article">

                            Leer más

                        </a>

                    </div>

                </article>

            </div>
        `
    })
}

function cargarEntrenamientos(entrenamientos) {

    const contenedor =
        document.getElementById("contenedorEntrenamientos")

    if (!contenedor) return

    contenedor.innerHTML = ""

    if (entrenamientos.length === 0) {

        contenedor.innerHTML = `
            <div class="alert alert-light border rounded-4">

                No hay entrenamientos registrados

            </div>
        `

        return
    }

    entrenamientos.forEach(entrenamiento => {


        contenedor.innerHTML += `

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

                        ${entrenamiento.tiempo || 0} min

                    </small>

                </div>

                <div>

                    ${
                        entrenamiento.estado === 'finalizado'

                            ?

                            `
                            <span class="badge bg-success">

                                ${entrenamiento.asistentes || 0}
                                asistentes

                            </span>
                            `

                            :

                            `
                            <span class="badge bg-secondary">

                                Pendiente

                            </span>
                            `
                    }

                </div>

            </div>
        `
    })
}

/* =========================================
   GRAFICA
========================================= */

function cargarGrafica(asistencias) {

    const canvas =
        document.getElementById("graficoAsistencia")

    if (!canvas) return

    const asistenciasFinalizadas =
        asistencias.filter(a => a.total !== null)

    if (asistenciasFinalizadas.length === 0) {

        canvas.parentElement.innerHTML = `

            <div class="d-flex align-items-center
                        justify-content-center h-100
                        text-white-50">

                No hay asistencias registradas

            </div>
        `

        return
    }

    const ctx = canvas.getContext("2d")

    if (graficoAsistencia) {
        graficoAsistencia.destroy()
    }

    graficoAsistencia = new Chart(ctx, {

        type: "line",

        data: {

            labels:
                asistenciasFinalizadas.map(a => a.fecha),

            datasets: [{

                label: "Asistencia",

                data:
                    asistenciasFinalizadas.map(a => a.total),

                borderWidth: 3,

                tension: 0.4,

                fill: true
            }]
        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {
                    display: false
                }
            },

            scales: {

                y: {
                    beginAtZero: true
                }
            }
        }
    })
}

/* =========================================
   UTILIDADES
========================================= */

function formatearFecha(fecha) {

    if (!fecha) return "-"

    const date = new Date(fecha)

    return date.toLocaleDateString("es-ES", {

        day: "2-digit",
        month: "short",
        year: "numeric"
    })
}

/* =========================================
   ERROR
========================================= */

function mostrarError() {

    document.body.innerHTML = `

        <div class="container py-5">

            <div class="alert alert-danger text-center p-5 rounded-4">

                <h2 class="mb-3">
                    Error al cargar el equipo
                </h2>

                <p class="mb-0">
                    No se pudo obtener la información.
                </p>

            </div>

        </div>
    `
}
