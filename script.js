let currentPokemon;
let stats = [];
let myChart;

async function init() {
  await loadPokemon();
  renderPokemonInfo();
  changeBackground();
}

async function loadPokemon() {
  let url = "https://pokeapi.co/api/v2/pokemon/charmander";
  let response = await fetch(url);
  currentPokemon = await response.json();
  console.log(currentPokemon);
}

function renderPokemonInfo() {
  document.getElementById("pokemonName").innerHTML = currentPokemon["name"];
  document.getElementById("pokemonImage").src =
    currentPokemon["sprites"]["front_shiny"];
  document.getElementById("species").innerHTML =
    currentPokemon["types"][0]["type"]["name"];
  document.getElementById("typeCard").innerHTML =
    currentPokemon["types"][0]["type"]["name"];
  document.getElementById("height").innerHTML =
    currentPokemon["height"] + " cm";
  document.getElementById("weight").innerHTML =
    currentPokemon["weight"] + " kg";
  document.getElementById("abilities").innerHTML =
    currentPokemon["abilities"][0]["ability"]["name"];
}

async function renderPokemonCard() {
  await loadPokemon();
  document.getElementById("pokemonName").innerHTML = currentPokemon["name"];
  document.getElementById("pokemonImage").src =
    currentPokemon["sprites"]["front_shiny"];
  document.getElementById("typeCard").innerHTML =
    currentPokemon["types"][0]["type"]["name"];
  renderStatsInCharts();
  changeBackground();
}

async function renderPokemonMoveAndEvolution() {
  await loadPokemon();
  document.getElementById("pokemonName").innerHTML = currentPokemon["name"];
  document.getElementById("pokemonImage").src =
    currentPokemon["sprites"]["front_shiny"];
  document.getElementById("typeCard").innerHTML =
    currentPokemon["types"][0]["type"]["name"];
  changeBackground();
}

function renderChart() {
  const ctx = document.getElementById("myChart");

  // Überprüfe, ob ein Chart bereits existiert, und zerstöre es
  if (myChart) {
    myChart.destroy();
  }

  // Erstelle das neue Chart-Objekt und speichere es in der Variable myChart
  myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["HP", "Attack", "Defense", "Sp. Atk", "Sp. Def", "Speed"],
      datasets: [
        {
          label: "Stats",
          data: stats,
          borderWidth: 1,
          backgroundColor: [
            "rgba (54, 162, 235, 0.2)",
            "rgba (54, 162, 235, 0.2)",
            "rgba (54, 162, 235, 0.2)",
            "rgba (54, 162, 235, 0.2)",
            "rgba (54, 162, 235, 0.2)",
            "rgba (54, 162, 235, 0.2)",
          ],
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

function renderStatsInCharts() {
  stats.push(currentPokemon["stats"][0]["base_stat"]);
  stats.push(currentPokemon["stats"][1]["base_stat"]);
  stats.push(currentPokemon["stats"][2]["base_stat"]);
  stats.push(currentPokemon["stats"][3]["base_stat"]);
  stats.push(currentPokemon["stats"][4]["base_stat"]);
  stats.push(currentPokemon["stats"][5]["base_stat"]);
  console.log(stats);
  renderChart();
}

function changeBackground() {
  // Das Element mit der ID "typeCard" auswählen und seinen Textinhalt erhalten
  const typeCardText = document
    .getElementById("typeCard")
    .innerText.toLowerCase();

  // Das Element mit der ID "pokedex" auswählen
  const pokedexElement = document.getElementById("pokedex");

  // Überprüfen, welches Wort sich in typeCard befindet, und den Hintergrund von pokedex entsprechend ändern
  if (typeCardText === "fire") {
    pokedexElement.style.backgroundColor = "rgb(215, 88, 88)";
  } else if (typeCardText === "electric") {
    pokedexElement.style.backgroundColor = "rgb(223, 185, 33)";
  } else if (typeCardText === "grass") {
    pokedexElement.style.backgroundColor = "rgb(64, 207, 39)";
  } else if (typeCardText === "water") {
    pokedexElement.style.backgroundColor = "rgb(39, 157, 207)";
  }
}

// Die Funktion aufrufen, um die Hintergrundfarbe zu ändern
changeBackground();
