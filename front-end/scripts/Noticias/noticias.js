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

async function cargarNoticias() {

    const equipo = document.getElementById("filtroEquipo").value
    const orden = document.getElementById("filtroFecha").value

    let url = "/api/noticias?"



    if (equipo) {

        url += "equipo=" + equipo

    }

    const lista = document.getElementById("listaNoticias")

    lista.innerHTML = `

        <div class="col-12 text-center py-5">

            <div
                class="spinner-border text-primary"
                role="status">

                <span class="visually-hidden">
                    Cargando...
                </span>

            </div>

            <p class="mt-3 text-muted">

                Cargando noticias...

            </p>

        </div>

    `



    const res = await fetch(url)

    const data = await res.json()


    // ORDENAR FECHAS EN FRONTEND

    data.sort((a, b) => {

        const fechaA = new Date(a.fecha_pub)
        const fechaB = new Date(b.fecha_pub)

        if (orden === "antiguas") {

            return fechaA - fechaB

        } else {

            return fechaB - fechaA

        }

    })

    

    lista.innerHTML = ""

    // SI NO HAY NOTICIAS

    if (data.length === 0) {

        lista.innerHTML = `
            <div class="col-12 text-center">
                <p>No hay noticias disponibles</p>
            </div>
        `

        return
    }


    // PINTAR NOTICIAS

    data.forEach(n => {

    lista.innerHTML += `

    <div class="col-md-4">

        <article class="tarjetaNoticia">

            <div class="imagen-noticia">

                <img src="${n.foto_noticia}">

                <span class="badge bg-primary categoria">
                    ${n.nombre_equipo}
                </span>

            </div>

            <div class="contenido-noticia">

                <h5 class="titulo-noticia">
                    ${n.titulo}
                </h5>

                <p class="texto-noticia">
                    ${n.subtitulo || ""}
                </p>

                <div class="info-noticia">

                    <span>
                        ${new Date(n.fecha_pub).toLocaleDateString("es-ES")}
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

cargarEquipos()
cargarNoticias()
