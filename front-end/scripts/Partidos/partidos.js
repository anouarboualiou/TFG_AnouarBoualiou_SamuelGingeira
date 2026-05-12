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



    const contenedor = document.getElementById("listaPartidos")

    contenedor.innerHTML = ""



    partidos.forEach(p => {

        contenedor.innerHTML += `

        <div class="col-lg-6">

            <article class="tarjeta-partido">

                <header 
                    class="encabezado-partido text-center text-white bg-dark"

                    style="
                        background-image:
                        linear-gradient(
                            rgba(0,0,0,0.5),
                            rgba(0,0,0,0.7)
                        ),
                        url('${p.foto_campo || 'https://pbs.twimg.com/media/Fdkd_NLWAAE-big.png'}');
                    ">

                    ${p.estado === 'finalizado'

                                ?

                                `
                            <span class="badge bg-success estado-partido">
                                FINALIZADO
                            </span>
                        `

                                :

                                `
                            <span class="badge bg-warning text-dark estado-partido">
                                PENDIENTE
                            </span>
                        `
                            }

                            <span class="equipo">

                                ${p.nombre_equipo}

                            </span>

                            <span class="vs">

                                VS

                            </span>

                            <span class="equipo">

                                ${p.rival_nombre}

                            </span>

                </header>

                <div class="info-partido text-muted text-center">

                    <p class="mt-3">

                        <i class="bi bi-calendar3 text-primary me-2"></i>

                        ${new Date(p.fecha_part).toLocaleDateString("es-ES")}

                    </p>

                    <p>

                        <i class="bi bi-clock text-primary me-2"></i>

                        ${p.hora_part?.slice(0, 5) || '--:--'}

                    </p>

                    <p>

                        <i class="bi bi-geo-alt text-primary me-2"></i>

                        ${p.rival_campo}

                    </p>

                    <p>

                        <i class="bi bi-trophy text-primary me-2"></i>

                        ${p.estado === 'finalizado'

                ?

                `${p.goles_favor} - ${p.goles_contra}`

                :

                'Pendiente'
            }

                    </p>

                </div>

            </article>

        </div>

        `

    })

}

cargarEquipos()
cargarPartidos()