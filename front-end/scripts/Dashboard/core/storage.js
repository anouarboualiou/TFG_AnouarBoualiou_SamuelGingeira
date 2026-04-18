//DE MOMENTO SOLO PARA TESTEAR FUNCIONALIDAD, SERA ELIMINADO PORQUE SE VAN A HACER LOS FETCH SE HARAN EN SERVICE

export function getData(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

export function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}