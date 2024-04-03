let currentPokemon;

async function init() {
  await loadPokemon();
  renderPokemonInfo()
}

async function loadPokemon() {
  let url = "https://pokeapi.co/api/v2/pokemon/charmander";
  let response = await fetch(url);
  currentPokemon = await response.json();
  console.log(currentPokemon);
}

function renderPokemonInfo() {
  document.getElementById("pokemonName").innerHTML = currentPokemon["name"];
  document.getElementById("pokemonImage").src = currentPokemon["sprites"]["front_shiny"];
  document.getElementById("species").innerHTML = currentPokemon["types"][0]["type"]["name"];
  document.getElementById("typeCard").innerHTML = currentPokemon["types"][0]["type"]["name"];
  document.getElementById("height").innerHTML = currentPokemon["height"] + " cm";
  document.getElementById("weight").innerHTML = currentPokemon["weight"] + " kg";
  document.getElementById("abilities").innerHTML = currentPokemon["abilities"][0]["ability"]["name"];
}

async function renderPokemonCard() {
  await loadPokemon();
  document.getElementById("pokemonName").innerHTML = currentPokemon["name"];
  document.getElementById("pokemonImage").src = currentPokemon["sprites"]["front_shiny"];
  document.getElementById("typeCard").innerHTML = currentPokemon["types"][0]["type"]["name"];
  renderChart();
}

function renderChart() {
const ctx = document.getElementById('myChart');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['HP', 'Attack', 'Defense', 'Sp. Atk', 'Sp. Def', 'Speed', 'Total'],
      datasets: [{
        label: 'Stats',
        data: [12, 19, 3, 5, 2, 3, 37],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
