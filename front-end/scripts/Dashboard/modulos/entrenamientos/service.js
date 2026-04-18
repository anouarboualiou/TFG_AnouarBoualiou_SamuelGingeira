import { getData, saveData } from "../../core/storage.js";

//CONTROL DE LOS DATOS 


const clave = "entrenamientos";

export function getEntrenamientos() {
    return getData(clave);
}

export function saveEntrenamientos(data) {
    saveData(clave, data);
}