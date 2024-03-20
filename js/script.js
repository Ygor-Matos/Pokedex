const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');
const pesquisa = document.querySelector('.pesquisa');
const prev = document.querySelector('.btn-prev');
const next = document.querySelector('.btn-next');
const input = document.querySelector('.input_search')

let searchPokemon=1;


const fetchPokemon = async (pokemon) =>{

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if(APIResponse.status === 200){
        const data = await APIResponse.json();
        return data;
    }

}

const renderPokemon = async (pokemon) =>{

    pokemonName.innerHTML = "Carregando...";
    const data = await fetchPokemon(pokemon);

    if(data){
        pokemonImage.style.display= 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data.sprites.versions['generation-v']['black-white'].animated.front_default;
        searchPokemon=data.id
        input.value='';

    }else{
        pokemonName.innerHTML = "não encontrado";
        pokemonNumber.innerHTML = '';
        pokemonImage.style.display = 'none';
        
    }
    
}


prev.addEventListener('click', ()=>{

    if(searchPokemon>1){
        searchPokemon-=1;
        renderPokemon(searchPokemon);
    }

})

next.addEventListener('click', ()=>{

    searchPokemon+=1;
    renderPokemon(searchPokemon)

})

const pesquisando = () => {

    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
    
}

pesquisa.addEventListener('submit', pesquisando);


renderPokemon(searchPokemon);
