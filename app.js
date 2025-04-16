const pokedexInitButton = document.getElementById("pokedex-header-button");
const pokedexDoor = document.getElementById("pokedex-door");
const pokedexContent = document.getElementById("pokedex-content");
const pokedexImageContainer = document.getElementById("pokedex-image");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
const pageNumber = document.getElementById("page-number");

let currentPokemonId = 1; // Start with Bulbasaur (ID 1)

// Open/Close Pokedex Door
pokedexInitButton.addEventListener("click", () => {
  if (pokedexDoor.classList.contains("close")) {
    pokedexDoor.classList.remove("close");
    pokedexDoor.classList.add("open");
  } else {
    pokedexDoor.classList.remove("open");
    pokedexDoor.classList.add("close");
  }
});

// Fetch a Single Pokémon by ID
async function fetchPokemonById(pokemonId) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    const pokemon = await response.json();
    displayPokemon(pokemon);
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
  }
}

// Display a Single Pokémon
function displayPokemon(pokemon) {
  pokedexImageContainer.innerHTML = ""; // Clear previous content

  // Create Pokémon Image Element
  const imgElement = document.createElement("img");
  imgElement.src = pokemon.sprites.front_default; // Use the default front sprite
  imgElement.alt = pokemon.name;
  imgElement.title = pokemon.name;

  // Create Pokémon Name Element
  const nameElement = document.createElement("h2");
  nameElement.textContent = `${pokemon.name} (#${pokemon.id})`;

  // Append Elements to the Container
  pokedexImageContainer.appendChild(imgElement);
  pokedexImageContainer.appendChild(nameElement);

  // Update Page Number
  pageNumber.textContent = pokemon.id;
}

// Handle Previous Button
prevButton.addEventListener("click", () => {
  if (currentPokemonId > 1) {
    currentPokemonId--;
    fetchPokemonById(currentPokemonId);
  }
});

// Handle Next Button
nextButton.addEventListener("click", () => {
  currentPokemonId++;
  fetchPokemonById(currentPokemonId);
});

// Initial Fetch
fetchPokemonById(currentPokemonId);