

Pokedex_list(151);//151

async function Pokedex_list(Pokemon_index) {
    
    for (let index = 1; index <= Pokemon_index; index++) {

               const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${index}`);
                                                       
               const sec_response =  await fetch(`https://pokeapi.co/api/v2/pokemon-species/${index}/`);
       
               const third_response =  await fetch(`https://pokeapi.co/api/v2/pokemon-form/${index}/`);
        
        let Pokemondata = [response, sec_response, third_response];
        
        Promise.all(Pokemondata).then(async(values) => { //? need more knowledge promises in general
          
             let pokemonCharacteristic =  await values[0].json();
             let pokemonDescription = await  values[1].json();
             let pokemonType = await values[2].json();
             PokemonRender(pokemonCharacteristic,pokemonDescription,pokemonType);
               /*
               let pokemonMainDescription = [];
               pokemonMainDescription.push(await values[0].json());
               pokemonMainDescription.push(await values[1].json());
               pokemonMainDescription.push(await values[2].json());
               PokemonRender(pokemonMainDescription[0], pokemonMainDescription[1], pokemonMainDescription[2])
               */
                //console.log(pokemonMainDescription[0]);
                //console.log(pokemonMainDescription[1]);
               //console.log(pokemonMainDescription[2]);
            
        });
       
    }
   
}



function PokemonRender(pokemonCharacteristic, pokemonDescription, pokemonType) {
    // console.log(pokemonCharacteristic)
    //console.log( pokemonDescription)
    //console.log(pokemonType)
    const main = document.getElementById("PokemonCollection")
    const PokemonCard = document.createElement('div');
    PokemonCard.classList.add("PokemonBox")
    PokemonCard.innerHTML = ` 
sget
<div class="Description ${pokemonType.types[0].type.name}">
         <p class="BottomText">No.${pokemonCharacteristic.id}</p>
         <img src="${pokemonCharacteristic.sprites.versions['generation-v']['black-white'].animated.front_default}"
         class="PokemonImgSize">
 <div class="MiddleSection">
     <div class="PokemonDescription" id="PokemonDescription">
         <p class="MiddleText">${pokemonCharacteristic.name.toUpperCase()}</p>
         <p class="MiddleText">HP ${pokemonCharacteristic.stats[0].base_stat}</p>
         <br>
     <div id="Type">
         <p class="MiddleText">${PokemonType(pokemonType)}<p>
     </div>
         <br>
         <span class="BottomText">${pokemonDescription.flavor_text_entries[10].flavor_text.toUpperCase()}</span>
    </div>
 </div>
        <div class="RightSection" id="id2"> 
        <img src="${pokemonCharacteristic.sprites.versions['generation-v']['black-white'].animated.back_default}"class="PokemonImgSize">
        </div>
</div>
</div>
 `
    main.appendChild(PokemonCard);
};
function PokemonType(pokemonType) {
    let type = "";
    for (let index = 0; index < pokemonType.types.length; index++) {
        type += pokemonType.types[index].type.name.toUpperCase() + " ";
    }
    return type;
}
function PokemonMoves(pokemonCharacteristic) { // not implemented ****
    let Moves = "";
    for (let index = 0; index < pokemonCharacteristic.moves.length; index++) {
        console.log(pokemonCharacteristic.moves[index].move.name);
        Moves += pokemonCharacteristic.moves[index].move.name.toUpperCase() + " ";
    }
    return Moves;
}

