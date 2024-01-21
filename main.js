const pokeInput = document.querySelector('.poke-input');
const pokeSearch = document.querySelector('.poke-search');
const pokeContainer = document.querySelector('.poke-container');
const pokeAPI = 151;

const colors = {
    fire: "#FDDFDF",
    grass: "#DEFDE0",
    electric: "#FCF7DE",
    water: "#DEF3FD",
    ground: "#f4e7da",
    rock: "#d5d5d4",
    fairy: "#fceaff",
    poison: "#d6b3ff",
    bug: "#f8d5a3",
    dragon: "#97b3e6",
    psychic: "#eaeda1",
    flying: "#F5F5F5",
    fighting: "#E6E0D4",
    normal: "#F5F5F5",
    ice: "#e0f5ff ",
};

const initPokemon = async () => {
    for(let i = 0; i <= pokeAPI; i++) {
        await getPokemon(i);
    }
};

const getPokemon = async (id) => {
    let url = `https://pokeapi.co/api/v2/pokemon/${id + 1}`;
    let res = await fetch(url);
    let data = await res.json();
    createPokemonBox(data);
};

const createPokemonBox = async (pokemon) => {
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const id = pokemon.id.toString().padStart(3, '0');
    const weight = pokemon.weight;
    const type = pokemon.types[0].type.name;
    const color = colors[type];
    // console.log(name);

    const div = document.createElement('div');
    div.classList.add('poke-box');
    div.style.backgroundColor = color;
    div.innerHTML = `
    <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png" alt="${name} image">
    <div>
        <h1 class="poke-name">${name}</h1>
        <p class="poke-id">#${id}</p>
        <p class="poke-weight">${weight}Kg</p>
        <p class="poke-type">Type:${type}</p>
    </div>`;

    pokeContainer.appendChild(div);
};

initPokemon();

pokeInput.addEventListener('input', function(e) {
    const pokeNames = document.querySelectorAll('.poke-name');
    const search = pokeInput.value.toLowerCase();
    console.log(pokeNames);

    pokeNames.forEach((pokeName) => {
        pokeName.parentElement.parentElement.style.display = 'block';

        if(!pokeName.innerHTML.toLowerCase().includes(search)) {
            pokeName.parentElement.parentElement.style.display = 'none';
        }
    });
    console.log(search);
});