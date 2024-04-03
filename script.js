let currentPokemon;
let stats = [];
let myChart;

async function init() {
  await loadPokemon();
  renderPokemonInfo();
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
