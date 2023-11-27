
(function( ) {

      // OBTENEMOS EL tbody DONDE VAMOS A IMPRIMIR TODOS LOS POKEMON
      const listaPokemon = document.querySelector('#listaPokemon');
      // OBTENEMOS LOS BOTONES
      let btnHeader = document.querySelectorAll('.btn-header');
        //  LA URL DE LA API
      let URL = 'https://pokeapi.co/api/v2/pokemon/';

     // INICIA LA PÁGINA PRINCIPAL DEL HTML
       btnHeader.forEach( btn => {
            //PASAMOS EL EVENTO CLICK A CADA BOTÓN
            btn.addEventListener('click', ( e ) => {
                const btnId = e.currentTarget.id;
                // REINICIAMOS EL HTML ANTERIOR
                clearHtml( );
                for( let i = 0; i <= 150; i++ ) {
                    fetch( URL + i) 
                        .then( response => response.json() )
                        .then( data => {
                            if( btnId === 'ver-todos' ) {
                                mostrarPokemon( data );
                            } else {
                                const tipos = data.types.map( type => type.type.name )
                                if( tipos.some( tipo => tipo.includes( btnId ))) {
                                    mostrarPokemon( data );
                                  }}
                                
                           
                        });
                }


            })
       })

       // FUNCIÓN QUE LIMPIA EL DOM Y QUITA EL HTML 
            function clearHtml( ) {
                while ( listaPokemon.firstChild ) {   
                    listaPokemon.removeChild( listaPokemon.firstChild ); 
                    }
             }

        // FUNCIÓN QUE MUESTRA EL POKEMON
             function mostrarPokemon( pokemon ) {      
                    // NOS TRAEMOS LOS TIPOS DE POKEMON
                    let tipos = pokemon.types.map( (type) => (
                        `<p class="${type.type.name} tipo">${ type.type.name }</p>`
                        ));
                    tipos.join('');
                    let pokeId = pokemon.id.toString();
                    if( pokeId.length === 1 ) {
                        pokeId = "00" + pokeId;
                    } else if( pokeId.length === 2 ) {
                        pokeId = "0" + pokeId;
                    } 

                    const div = document.createElement('DIV');
                    div.classList.add('pokemon');
                    div.innerHTML = `
                    <p class="pokemon-id-back">${ pokeId }</p>
                    <div class="pokemon-imagen">
                    <img src="${ pokemon.sprites.other["official-artwork"].   front_default }" alt="${ pokemon.name }">
                    </div>
                    <div class="pokemon-info">
                            <div class="nombre-contenedor">
                                <p class="pokemon-id">#${ pokeId }</p>
                                <h2 class="pokemon-nombre">${ pokemon.name }</h2>
                            </div>
                            <div class="pokemon-tipos">
                                ${ tipos }
                            </div>
                            <div class="pokemon-stats">
                                <p class="stat">${ pokemon.height } M</p>
                                <p class="stat">${ pokemon.weight } KG</p>
                            </div>
                            <button class="btnVer modal-btn">Ver Pokemon</button>
                    </div>`;

                    listaPokemon.append( div );
            
  
              }
          
    

})();

