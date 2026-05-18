async function cargarEquipos() {

    const res = await fetch("/api/equipos")

    const equipos = await res.json()

    const select = document.getElementById("filtroEquipo")



    equipos.forEach(equipo => {

        select.innerHTML += `
            <option value="${equipo.id_equipo}">
                ${equipo.nombre}
            </option>
        `

    })

}

async function cargarPartidos() {

    const equipo = document.getElementById("filtroEquipo").value
    const estado = document.getElementById("filtroEstado").value
    const orden = document.getElementById("filtroFecha").value

    let url = "/api/partidos?"



    if (equipo) {

        url += `equipo=${equipo}&`

    }



    if (estado) {

        url += `estado=${estado}`

    }

    const contenedor = document.getElementById("listaPartidos")

    contenedor.innerHTML = `

        <div class="col-12 text-center py-5">

            <div
                class="spinner-border text-primary"
                role="status">

                <span class="visually-hidden">
                    Cargando...
                </span>

            </div>

            <p class="mt-3 text-muted">

                Cargando partidos...

            </p>

        </div>

    `

    const res = await fetch(url)
    const partidos = await res.json()

    // ORDEN FECHA FRONTEND

    partidos.sort((a, b) => {

        const fechaA = new Date(a.fecha_part)
        const fechaB = new Date(b.fecha_part)

        if (orden === "antiguos") {

            return fechaA - fechaB

        } else {

            return fechaB - fechaA

        }

    })

    contenedor.innerHTML = ""

    // SI NO HAY NOTICIAS

    if (partidos.length === 0) {

        contenedor.innerHTML = `
            <div class="col-12 text-center">
                <p>No hay partidos disponibles</p>
            </div>
        `

        return
    }



    partidos.forEach(p => {

        contenedor.innerHTML += `

        <div class="col-lg-6">

            <article class="tarjeta-partido ${

    p.estado === 'finalizado'

        ?

        p.goles_favor > p.goles_contra
            ? 'victoria'
            : p.goles_favor < p.goles_contra
                ? 'derrota'
                : 'empate'

        :

        ''

}">

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
                            ? `${p.goles_favor} - ${p.goles_contra}`
                            : 'VS'
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

            ${new Date(p.fecha_part)
                .toLocaleDateString("es-ES")}

        </p>

        <p>

            <i class="bi bi-clock text-primary me-2"></i>

            ${p.hora_part?.slice(0, 5) || '--:--'}

        </p>

        <p>

            <i class="bi bi-geo-alt text-primary me-2"></i>

            ${p.rival_campo}

        </p>

    </div>

</article>

        </div>

        `

    })

}

cargarEquipos()
cargarPartidos()