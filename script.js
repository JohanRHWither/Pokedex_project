const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const pokemonWeight = document.getElementById("weight");
const pokemonHeight = document.getElementById("height");
const pokemonImg = document.getElementById("sprite");
const pokemonTypes = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const spAttack = document.getElementById("special-attack");
const spDef = document.getElementById("special-defense");
const speed = document.getElementById("speed");

const pokemonAPI = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon"

const validSearch = () => {
  let input1 = searchInput.value.toLowerCase();
  let input = searchInput.value.toLowerCase().replace(/[^a-z0-9]/g, '');
  const link = pokemonAPI+"/"+input;
  fetchPokemonInfo(link);
}

const fetchData = async () => {
  try {
    const res = await fetch(pokemonAPI);
    const data = await res.json();
  } catch (err) {
    console.log(err);
  }
};

const fetchPokemonInfo = async (link) => {
  try {
    const res = await fetch(link);
    const data = await res.json();
    displayData(data);
  } catch (err) {
    console.log(err);
    alert("Pokémon not found");
  }
  
};

const displayData = (dataObject) => {
  const {height,id,name,sprites,stats,types,weight} = dataObject;
  pokemonName.textContent = name.toUpperCase()+" ";
  pokemonId.textContent = `#${id}`;
  pokemonWeight.textContent = `Weight: ${weight}`;
  pokemonHeight.textContent = `Height: ${height}`;
  pokemonImg.src = sprites.front_default
  pokemonImg.alt = `Image of ${name}`;
  hp.textContent = stats[0].base_stat;
  attack.textContent = stats[1].base_stat;
  defense.textContent = stats[2].base_stat;
  spAttack.textContent = stats[3].base_stat;
  spDef.textContent = stats[4].base_stat;
  speed.textContent = stats[5].base_stat;
  displayTypes(types);
}

const displayTypes = (typesObject) => {
  if (pokemonTypes.innerHTML!="") {
    pokemonTypes.innerHTML = ""
  }
  typesObject.forEach((slot)=>{
    let type = slot.type;
    pokemonTypes.innerHTML += `<div class="type ${type.name}">${type.name.toUpperCase()}</div>`;
  })
}

fetchPokemonInfo("https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/pikachu")

searchButton.addEventListener("click",validSearch)

searchInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    validSearch()
  }
});
