const url = "https://pokeapi.co/api/v2/pokemon?limit=1008&offset=0.";
const pokeContainer = document.querySelector(".pokemon-container");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".previous");
const firstBtn = document.querySelector(".first");
const lastBtn = document.querySelector(".last");
const search = document.querySelector(".search");
const currentPage = document.querySelector(".current-page");

//Variables

let pokeId = 0;
let pokeArray = [];
let pageFloor = 0;
let pageCeiling = 20;
let pageNumber = 1;

currentPage.innerHTML = pageNumber;



//Fetch

 async function fetchData() {

    try {
        const response = await fetch(url);
        const answer = await response.json();
        createObject(answer.results);
    } catch {
        pokeContainer.innerHTML = "Error!"
    }
    
}

fetchData();



function createObject(data) {

    
   

    for(let i = 0; i < data.length; i++) {
        
        pokeId = pokeId + 1;

        pokeObject = {
             name: data[i].name,
             id: pokeId,
             sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeId}.png`
         }

         pokeArray.push(pokeObject);
    }

    createHtml(pokeArray);


}




function createHtml(dataFromArray) {

    

    pokeContainer.innerHTML = "";
    

    for(let i = pageFloor; i < pageCeiling; i++) {
        
        pokeContainer.innerHTML += `<a href="details.html?id=${dataFromArray[i].id}"><div class="pokemon"><h4>${capitalization(dataFromArray[i].name)}<h4>
        <img src="${dataFromArray[i].sprite}" alt="Sprite of ${capitalization(dataFromArray[i].name)}">
        <p class="id-number">#${dataFromArray[i].id}</p></div></a>`

    }

}



//Search



search.onkeyup = function() {

    pageNumber = 1;
    currentPage.innerHTML = pageNumber;
    pageFloor = 0;
    pageCeiling = 20;


    const filterValue = this.value.trim().toLowerCase();
    const filteredPokemon = pokeArray.filter(function(pokemon){

        if(pokemon.name.toLowerCase().includes(filterValue)) {
            return true;
        }

    }) 
    
    createHtml(filteredPokemon);
    
}




//Buttons

prevBtn.disabled = true;
firstBtn.disabled = true;


lastBtn.onclick = function() {

    document.getElementById("top").scrollIntoView();

    pageNumber = 51;
    currentPage.innerHTML = pageNumber;

    pageFloor = 1000;
    pageCeiling = 1020;
    
    nextBtn.disabled = true;
    lastBtn.disabled = true;
    prevBtn.disabled = false;
    firstBtn.disabled = false;

    createHtml(pokeArray);

}


nextBtn.onclick = function() {

    document.getElementById("top").scrollIntoView();

    pageNumber++;
    currentPage.innerHTML = pageNumber;
    
  
        pageFloor = pageFloor + 20;
        pageCeiling = pageCeiling + 20;

        if(pageFloor > 0) {
            prevBtn.disabled = false;
            firstBtn.disabled = false;
        }     

        if(pageCeiling === 1020) {
            nextBtn.disabled = true;
            lastBtn.disabled = true;
        } 
    

    createHtml(pokeArray);


}


firstBtn.onclick = function() {

    document.getElementById("top").scrollIntoView();

    pageNumber = 1;
    currentPage.innerHTML = pageNumber;

    pageFloor = 0;
    pageCeiling = 20;
    
    nextBtn.disabled = false;
    lastBtn.disabled = false;
    prevBtn.disabled = true;
    firstBtn.disabled = true;

    createHtml(pokeArray);

}


prevBtn.onclick = function() {


    document.getElementById("top").scrollIntoView();

    pageNumber--;
    currentPage.innerHTML = pageNumber;

    pageFloor = pageFloor - 20;
    pageCeiling = pageCeiling - 20;

    createHtml(pokeArray);

    if(pageFloor < 20) {
        prevBtn.disabled = true;
        firstBtn.disabled = true;
    }

   if(pageFloor < 1000) {
         nextBtn.disabled = false;
         lastBtn.disabled = false;
     }

}


function capitalization(upperCaseThis) {

    const upperCase = upperCaseThis.charAt(0).toUpperCase() + upperCaseThis.slice(1);

    return upperCase;

}