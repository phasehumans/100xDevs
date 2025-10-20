const countInput = document.getElementById("count");
const categorySelect = document.getElementById("category");
const generateBtn = document.getElementById("generate");
const cardsContainer = document.getElementById("cards");

generateBtn.addEventListener("click", async () => {
  const count = parseInt(countInput.value);
  const category = categorySelect.value;

  cardsContainer.innerHTML = "";

  if (!count || count < 1 || !category) {
    cardsContainer.innerHTML = `<p>Please enter a valid number and select a category.</p>`;
    return;
  }

  // Fetch all Pokémon of that category (type)
  const typeUrl = `https://pokeapi.co/api/v2/type/${category}`;
  const typeResponse = await fetch(typeUrl);
  const typeData = await typeResponse.json();
  const pokemonList = typeData.pokemon.slice(0, count);

  for (let i = 0; i < pokemonList.length; i++) {
    const pokeUrl = pokemonList[i].pokemon.url;
    const pokeData = await fetch(pokeUrl).then((res) => res.json());
    renderCard(pokeData);
  }
});

function renderCard(pokemon) {
  const card = document.createElement("div");
  card.classList.add("card");

  const img = pokemon.sprites.front_default;
  const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  const type = pokemon.types[0].type.name;

  card.innerHTML = `
    <img src="${img}" alt="${name}">
    <h3>${name}</h3>
    <span class="type ${type}">${type}</span>
  `;

  cardsContainer.appendChild(card);
}
