import { initTrainings } from "../modules/trainings/trainings.js";

//CONTROLAMOS EN QUE SECCION ESTAMOS


export function showSection(sectionId, element = null) {

    document.querySelectorAll("section").forEach(sec => {
        sec.style.display = "none";
    });

    document.getElementById(sectionId).style.display = "block";

    if (element) {
        document.querySelectorAll(".nav-link").forEach(link => {
            link.classList.remove("active");
        });
        element.classList.add("active");
    }

    switch (sectionId) {
        case "trainings":
            initTrainings();
            break;

        case "players":
            // initPlayers();
            break;

        case "matches":
            // initMatches();
            break;
    }
}