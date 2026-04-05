let activeTab = "players";

// DATA
let players = [
  { id: '1', name: 'Carlos Martínez', position: 'Portero', number: 1, age: 28, nationality: 'España' },
  { id: '2', name: 'Juan López', position: 'Defensa', number: 4, age: 25, nationality: 'España' }
];

let trainings = [];
let matches = [];
let news = [];

// NAVIGATION
function setTab(tab) {
  activeTab = tab;
  render();
}

// RENDER
function render() {
  const container = document.getElementById("content");

  if (activeTab === "players") renderPlayers(container);
  if (activeTab === "trainings") renderTrainings(container);
  if (activeTab === "matches") renderMatches(container);
  if (activeTab === "news") renderNews(container);
}

/////////////////////////////////////
// PLAYERS
/////////////////////////////////////
function renderPlayers(el) {
  el.innerHTML = `
    <h3>Jugadores</h3>
    <button class="btn btn-primary mb-3" onclick="showPlayerForm()">Añadir</button>
    <div id="playerForm"></div>
    <div class="row">
      ${players.map(p => `
        <div class="col-md-4">
          <div class="card p-3 mb-3">
            <h5>${p.name}</h5>
            <p>${p.position}</p>
            <p>${p.age} años</p>
            <button class="btn btn-danger btn-sm" onclick="deletePlayer('${p.id}')">Eliminar</button>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

function showPlayerForm() {
  document.getElementById("playerForm").innerHTML = `
    <input id="name" class="form-control mb-2" placeholder="Nombre">
    <input id="position" class="form-control mb-2" placeholder="Posición">
    <input id="age" class="form-control mb-2" placeholder="Edad">
    <button class="btn btn-success" onclick="addPlayer()">Guardar</button>
  `;
}

function addPlayer() {
  players.push({
    id: Date.now().toString(),
    name: document.getElementById("name").value,
    position: document.getElementById("position").value,
    age: document.getElementById("age").value
  });
  render();
}

function deletePlayer(id) {
  players = players.filter(p => p.id !== id);
  render();
}

/////////////////////////////////////
// TRAININGS
/////////////////////////////////////
function renderTrainings(el) {
  el.innerHTML = `
    <h3>Entrenamientos</h3>
    <button class="btn btn-primary mb-3" onclick="showTrainingForm()">Añadir</button>
    <div id="trainingForm"></div>
    ${trainings.map(t => `
      <div class="card p-3 mb-2">
        <h5>${t.title}</h5>
        <p>${t.date}</p>
        <button class="btn btn-danger btn-sm" onclick="deleteTraining('${t.id}')">Eliminar</button>
      </div>
    `).join("")}
  `;
}

function showTrainingForm() {
  document.getElementById("trainingForm").innerHTML = `
    <input id="title" class="form-control mb-2" placeholder="Título">
    <button class="btn btn-success" onclick="addTraining()">Guardar</button>
  `;
}

function addTraining() {
  trainings.push({
    id: Date.now().toString(),
    title: document.getElementById("title").value
  });
  render();
}

function deleteTraining(id) {
  trainings = trainings.filter(t => t.id !== id);
  render();
}

/////////////////////////////////////
// MATCHES
/////////////////////////////////////
function renderMatches(el) {
  el.innerHTML = `
    <h3>Partidos</h3>
    <button class="btn btn-primary mb-3" onclick="showMatchForm()">Añadir</button>
    <div id="matchForm"></div>
    ${matches.map(m => `
      <div class="card p-3 mb-2">
        <h5>${m.opponent}</h5>
        <p>${m.date}</p>
        <button class="btn btn-danger btn-sm" onclick="deleteMatch('${m.id}')">Eliminar</button>
      </div>
    `).join("")}
  `;
}

function showMatchForm() {
  document.getElementById("matchForm").innerHTML = `
    <input id="opponent" class="form-control mb-2" placeholder="Rival">
    <button class="btn btn-success" onclick="addMatch()">Guardar</button>
  `;
}

function addMatch() {
  matches.push({
    id: Date.now().toString(),
    opponent: document.getElementById("opponent").value
  });
  render();
}

function deleteMatch(id) {
  matches = matches.filter(m => m.id !== id);
  render();
}

/////////////////////////////////////
// NEWS
/////////////////////////////////////
function renderNews(el) {
  el.innerHTML = `
    <h3>Noticias</h3>
    <button class="btn btn-primary mb-3" onclick="showNewsForm()">Añadir</button>
    <div id="newsForm"></div>
    ${news.map(n => `
      <div class="card p-3 mb-2">
        <h5>${n.title}</h5>
        <button class="btn btn-danger btn-sm" onclick="deleteNews('${n.id}')">Eliminar</button>
      </div>
    `).join("")}
  `;
}

function showNewsForm() {
  document.getElementById("newsForm").innerHTML = `
    <input id="titleNews" class="form-control mb-2" placeholder="Título">
    <button class="btn btn-success" onclick="addNews()">Guardar</button>
  `;
}

function addNews() {
  news.push({
    id: Date.now().toString(),
    title: document.getElementById("titleNews").value
  });
  render();
}

function deleteNews(id) {
  news = news.filter(n => n.id !== id);
  render();
}

// INIT
render();