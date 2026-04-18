import { getEntrenamientos, saveEntrenamientos } from "./trainings.service.js";
import { renderEntrenamientos } from "./trainings.ui.js";

let entrenamientos = [];

export function initTrainings() {
    entrenamientos = getEntrenamientos();
    renderEntrenamientos(entrenamientos);
}

// GUARDAR
export function guardarEntrenamiento() {

    const form = document.getElementById("formEntrenamiento");

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const data = {
        titulo: document.getElementById("titulo").value,
        descripcion: document.getElementById("descripcion").value,
        fecha: document.getElementById("fecha").value,
        hora: document.getElementById("hora").value,
        duracion: document.getElementById("duracion").value,
        tipo: document.querySelector("select").value
    };

    entrenamientos.push(data);

    saveEntrenamientos(entrenamientos);
    renderEntrenamientos(entrenamientos);

    const modal = bootstrap.Modal.getInstance(document.getElementById('modalEntrenamiento'));
    modal.hide();

    form.reset();
}

// ELIMINAR (evento global)
document.addEventListener("eliminarEntreno", (e) => {
    entrenamientos.splice(e.detail, 1);
    saveEntrenamientos(entrenamientos);
    renderEntrenamientos(entrenamientos);
});