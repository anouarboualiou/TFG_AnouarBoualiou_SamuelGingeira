import { showSection } from "./router.js";
import { guardarEntrenamiento } from "../modules/trainings/trainings.js";

document.addEventListener("DOMContentLoaded", () => {

    // NAV
    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", function () {
            const section = this.getAttribute("data-section");
            showSection(section, this);
        });
    });

    // BOTÓN GUARDAR
    document
        .getElementById("btnGuardarEntreno")
        .addEventListener("click", guardarEntrenamiento);

    // Inicial
    showSection("players");
});