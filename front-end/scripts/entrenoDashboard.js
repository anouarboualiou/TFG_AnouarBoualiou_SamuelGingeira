
//FUNCION RENDER
let entrenamientos = JSON.parse(localStorage.getItem("entrenamientos")) || [];

function renderEntrenamientos() {
    const contenedor = document.querySelector("#listaEntrenamientos");
    contenedor.innerHTML = "";

    entrenamientos.forEach(data => {
        crearTarjetaEntrenamiento(data);
    });
}

function crearTarjetaEntrenamiento(data) {

    const contenedor = document.querySelector("#listaEntrenamientos");

    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjetaEntreno mb-3";

    tarjeta.innerHTML = `
    <div class="d-flex justify-content-between align-items-center w-100">

        <div>
            <h5 class="titulo-noticia">${data.titulo}</h5>
            <p class="texto-noticia mb-1">${data.descripcion}</p>

            <p class="text-muted small mb-2">
                ${data.fecha} · ${data.hora} · ${data.duracion}h
            </p>

            <span class="badge bg-info">${data.tipo}</span>
        </div>

        <div class="d-flex flex-column gap-2">
            <button class="btn btn-sm btn-warning" onclick="editarEntrenamiento(this)">
                <i class="bi bi-pencil"></i>
            </button>

            <button class="btn btn-sm btn-danger" onclick="eliminarEntrenamiento(this)">
                <i class="bi bi-trash"></i>
            </button>
        </div>

    </div>
`;

    contenedor.appendChild(tarjeta);
}

function guardarEntrenamiento() {

    const data = {
        titulo: document.getElementById("titulo").value,
        descripcion: document.getElementById("descripcion").value,
        fecha: document.getElementById("fecha").value,
        hora: document.getElementById("hora").value,
        duracion: document.getElementById("duracion").value,
        tipo: document.querySelector("select").value || "Táctico"
    };

    if (!tarjetaEditando) {
        entrenamientos.push(data);
    } else {
        const index = [...tarjetaEditando.parentNode.children].indexOf(tarjetaEditando);
        entrenamientos[index] = data; // 🔥 AQUÍ ESTÁ LA CLAVE
    }

    localStorage.setItem("entrenamientos", JSON.stringify(entrenamientos));

    renderEntrenamientos();

    const modal = bootstrap.Modal.getInstance(document.getElementById('modalEntrenamiento'));
    modal.hide();

    document.getElementById("formEntrenamiento").reset();

    tarjetaEditando = null;
}

function eliminarEntrenamiento(btn) {
    const tarjeta = btn.closest(".tarjetaEntreno");
    const index = [...tarjeta.parentNode.children].indexOf(tarjeta);

    entrenamientos.splice(index, 1);

    localStorage.setItem("entrenamientos", JSON.stringify(entrenamientos));

    renderEntrenamientos();
}

function editarEntrenamiento(btn) {
    tarjetaEditando = btn.closest(".tarjetaEntreno");

    const index = [...tarjetaEditando.parentNode.children].indexOf(tarjetaEditando);
    const data = entrenamientos[index];

    document.getElementById("titulo").value = data.titulo;
    document.getElementById("descripcion").value = data.descripcion;
    document.getElementById("fecha").value = data.fecha;
    document.getElementById("hora").value = data.hora;
    document.getElementById("duracion").value = data.duracion;
    document.querySelector("select").value = data.tipo;

    document.querySelector(".modal-title").innerText = "Editar Entrenamiento";
    document.getElementById("grupoFinalizado").style.display = "block";

    const modal = new bootstrap.Modal(document.getElementById('modalEntrenamiento'));
    modal.show();
}

function toggleAsistentes() {
    const valor = document.getElementById("finalizado").value;

    document.getElementById("grupoAsistentes").style.display =
        valor === "si" ? "block" : "none";
}

window.onload = () => {
    renderEntrenamientos();
};