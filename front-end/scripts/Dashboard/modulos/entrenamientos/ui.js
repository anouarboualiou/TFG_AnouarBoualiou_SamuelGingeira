export function renderEntrenamientos(lista) {

    const contenedor = document.getElementById("listaEntrenamientos");
    contenedor.innerHTML = "";

    lista.forEach((data, index) => {

        const tarjeta = document.createElement("div");
        tarjeta.className = "tarjetaEntreno mb-3";

        tarjeta.innerHTML = `
            <div class="d-flex justify-content-between align-items-center w-100">

                <div>
                    <h5>${data.titulo}</h5>
                    <p>${data.descripcion}</p>
                    <p class="text-muted small">
                        ${data.fecha} · ${data.hora} · ${data.duracion}h
                    </p>
                    <span class="badge bg-info">${data.tipo}</span>
                </div>

                <button class="btn btn-danger btn-sm" data-index="${index}">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        `;

        // evento eliminar
        tarjeta.querySelector("button").addEventListener("click", () => {
            document.dispatchEvent(new CustomEvent("eliminarEntreno", {
                detail: index
            }));
        });

        contenedor.appendChild(tarjeta);
    });
}