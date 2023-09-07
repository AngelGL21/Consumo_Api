const lista_pokemon = document.getElementById('lista_pokemon');
const buttons = document.getElementById('buttons');

const apiPokemon = 'https://pokeapi.co/api/v2/pokemon';

let botonSigue;
let botonAnte;
let plantillaHtml;

const getPokemon = async(url)=>{
    try {
        const response = await fetch(url);
        const results = await response.json();
        console.log(results)
        dataPokemon(results.results)

        botonSigue=results.next ? `<button onclick="masPoke(this)"  class="btn" data-url=${results.next}>Siguiente</button>` : '';
        botonAnte=results.previous ? `<button onclick="masPoke(this)" class="btn" data-url=${results.previous}">Anterior</button>`:'';
        buttons.innerHTML=botonAnte + " " + botonSigue

    } catch (error) {
        console.log(error)
    }
}
getPokemon(apiPokemon)

const dataPokemon = async(data)=>{
    lista_pokemon.innerHTML='';
    try {
        for(let index of data){
            //console.log(index)
            const resp = await fetch(index.url);
            const resul = await resp.json();
            console.log(resul)
            plantillaHtml = `
            
            <div class="pokemon_img">
            <img src=${resul.sprites.other.dream_world.front_default} alt=${resul.name}/>
            <hr>
            <h3>${resul.name}</h3>
            `
            lista_pokemon.innerHTML += plantillaHtml;
        }
    } catch (error) {
        console.log(error)
    }
}

function masPoke(button) {
    try {
        const url = button.getAttribute('data-url');
        console.log(url);
        getPokemon(url);
    } catch (error) {
        console.log(error)
    }
}
