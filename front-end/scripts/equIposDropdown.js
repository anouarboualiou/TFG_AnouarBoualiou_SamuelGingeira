document.addEventListener("DOMContentLoaded", cargarEquipos)

async function cargarEquipos() {

    const dropdown = document.getElementById("dropdownEquipos")
    const footerEquipos = document.getElementById("footerEquipos")

    try {

        const response = await fetch("/api/equipos")

        if (!response.ok) {
            throw new Error("Error obteniendo equipos")
        }

        const equipos = await response.json()

        // LIMPIAR

        if (dropdown) {
            dropdown.innerHTML = ""
        }

        if (footerEquipos) {
            footerEquipos.innerHTML = ""
        }

        equipos.forEach(equipo => {

            // NAVBAR

            if (dropdown) {

                const liNavbar = document.createElement("li")

                liNavbar.innerHTML = `
                    <a 
                        class="dropdown-item"
                        href="/equipos/${equipo.id_equipo}"
                    >
                        ${equipo.nombre}
                    </a>
                `

                dropdown.appendChild(liNavbar)
            }

            // FOOTER

            if (footerEquipos) {

                const liFooter = document.createElement("li")

                liFooter.innerHTML = `
                    <a href="/equipos/${equipo.id_equipo}">
                        ${equipo.nombre}
                        <i class="bi bi-chevron-right"></i>
                    </a>
                `

                footerEquipos.appendChild(liFooter)
            }

        })

    } catch (error) {

        console.error("Error cargando equipos:", error)
    }
}

