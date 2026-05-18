document.addEventListener('DOMContentLoaded', () => {

    cargarNoticias();
    cargarPartidos();

});

async function cargarNoticias() {

    try {

        const res = await fetch('/api/noticias');

        const noticias = await res.json();

        const ultimas4 = noticias
            .sort((a, b) => new Date(b.fecha_pub) - new Date(a.fecha_pub))
            .slice(0, 4);

        const contenedor = document.getElementById('contenedorNoticias');

        contenedor.innerHTML = ultimas4.map(n => `

            <div class="col-md-6">

                <article class="tarjetaNoticia">

                    <div class="imagen-noticia">

                        <img 
                            src="${n.foto_noticia}" 
                            alt="${n.titulo}"
                        >

                        <span class="badge bg-primary categoria">
                            ${n.nombre_equipo || 'Equipo'}
                        </span>

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
                                ${new Date(n.fecha_pub)
                                    .toLocaleDateString('es-ES')}
                            </span>

                        </div>

                        <a 
                            href="/noticias/${n.id_noticia}" 
                            class="btn btn-primary btn-article"
                        >
                            Leer más
                        </a>

                    </div>

                </article>

            </div>

        `).join('');

    } catch (error) {

        console.error('Error noticias:', error);

    }

}

async function cargarPartidos() {

    try {

        const res = await fetch('/api/partidos');

        const partidos = await res.json();

        const ultimos4 = partidos
            .sort((a, b) => {

                const fechaA = new Date(`${a.fecha_part} ${a.hora_part}`);
                const fechaB = new Date(`${b.fecha_part} ${b.hora_part}`);

                return fechaB - fechaA;

            })
            .slice(0, 4);

        const contenedor = document.getElementById('contenedorPartidos');

        contenedor.innerHTML = ultimos4.map(p => `

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

        `).join('');

    } catch (error) {

        console.error('Error partidos:', error);

    }

}