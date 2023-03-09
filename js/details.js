const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const nameContainer = document.querySelector(".name-container");
const imageContainer = document.querySelector(".image-container");
const heightWeightContainer = document.querySelector(".height-weight-container");
const typeContainer = document.querySelector(".type-container");

const baseStatsContainerOne = document.querySelector(".base-stats-1");
const baseStatsContainerTwo = document.querySelector(".base-stats-2");
const abilitiesContainer = document.querySelector(".abilities-container");
const textbox = document.querySelector(".text-box");

textbox.classList.add("hidden");

const url = "https://pokeapi.co/api/v2/pokemon/" + id;

async function fetchData() {

    try {
        const response = await fetch(url);
        const answer = await response.json();
        createHtml(answer);
        console.log(answer)
    } catch {
        console.log("error");
    }
   
}

fetchData();


function createHtml(details) {

    //Banner

    let mainType = details.types[0].type.name;

    if(mainType === details.types[0].type.name) {
        nameContainer.classList.add(`${details.types[0].type.name}-type`);
    }


    //Name
    nameContainer.innerHTML = `<h1>#${id} ${capitalization(details.name)}</h1>`;

    //Image
    imageContainer.innerHTML = `<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png" alt="Official artwork of ${capitalization(details.name)}">`;

    //Height and weight
    const height = document.createElement("p");
    height.innerHTML = `<b>Height:</b> ${dmToCm(details.height)}cm`;
   
    const weight = document.createElement("p");
    weight.innerHTML = `<b>Weight:</b> ${hgToKg(details.weight)}kg` 
   
    heightWeightContainer.append(height, weight);

    //Stats

    const hp = document.createElement("p");
    hp.innerHTML = `<b>HP:</b> ${details.stats[0].base_stat}`;

    const attack = document.createElement("p");
    attack.innerHTML = `<b>Attack:</b> ${details.stats[1].base_stat}`;

    const defense = document.createElement("p");
    defense.innerHTML = `<b>Defense:</b> ${details.stats[2].base_stat}`

    baseStatsContainerOne.append(hp, attack, defense);

    const specialAttack = document.createElement("p");
    specialAttack.innerHTML = `<b>SP-Attack:</b> ${details.stats[3].base_stat}`

    const specialDefense = document.createElement("p");
    specialDefense.innerHTML = `<b>SP-Defense:</b> ${details.stats[4].base_stat}`

    const speed = document.createElement("p");
    speed.innerHTML = `<b>Speed:</b> ${details.stats[5].base_stat}`

    baseStatsContainerTwo.append(specialAttack, specialDefense, speed);

    //Type
    for(let i = 0; i < details.types.length; i++) {

       

        const type = document.createElement("p");
        type.innerText = capitalization(details.types[i].type.name);
        type.classList.add("type");

        if(type.innerText === capitalization(details.types[i].type.name)) {
            type.classList.add(`${details.types[i].type.name}-type`);
        }


        typeContainer.append(type);
    }

    //Abilities


    for(let i = 0; i < details.abilities.length; i++) {
        const ability = document.createElement("div");
        ability.innerHTML = `${capitalization(details.abilities[i].ability.name)} <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 17C12.2833 17 12.521 16.904 12.713 16.712C12.905 16.52 13.0007 16.2827 13 16V11.975C13 11.6917 12.904 11.4583 12.712 11.275C12.52 11.0917 12.2827 11 12 11C11.7167 11 11.479 11.096 11.287 11.288C11.095 11.48 10.9993 11.7173 11 12V16.025C11 16.3083 11.096 16.5417 11.288 16.725C11.48 16.9083 11.7173 17 12 17ZM12 9C12.2833 9 12.521 8.904 12.713 8.712C12.905 8.52 13.0007 8.28267 13 8C13 7.71667 12.904 7.479 12.712 7.287C12.52 7.095 12.2827 6.99933 12 7C11.7167 7 11.479 7.096 11.287 7.288C11.095 7.48 10.9993 7.71733 11 8C11 8.28333 11.096 8.521 11.288 8.713C11.48 8.905 11.7173 9.00067 12 9ZM12 22C10.6167 22 9.31667 21.7373 8.1 21.212C6.88333 20.6867 5.825 19.9743 4.925 19.075C4.025 18.175 3.31267 17.1167 2.788 15.9C2.26333 14.6833 2.00067 13.3833 2 12C2 10.6167 2.26267 9.31667 2.788 8.1C3.31333 6.88333 4.02567 5.825 4.925 4.925C5.825 4.025 6.88333 3.31267 8.1 2.788C9.31667 2.26333 10.6167 2.00067 12 2C13.3833 2 14.6833 2.26267 15.9 2.788C17.1167 3.31333 18.175 4.02567 19.075 4.925C19.975 5.825 20.6877 6.88333 21.213 8.1C21.7383 9.31667 22.0007 10.6167 22 12C22 13.3833 21.7373 14.6833 21.212 15.9C20.6867 17.1167 19.9743 18.175 19.075 19.075C18.175 19.975 17.1167 20.6877 15.9 21.213C14.6833 21.7383 13.3833 22.0007 12 22Z" />
        </svg>`;
        ability.classList.add("ability");
        abilitiesContainer.append(ability);
    
    
        ability.addEventListener("click", function() {
            textbox.innerHTML = "Loading..."
           
            abilityUrl = details.abilities[i].ability.url;
            fetchAbility()
            textbox.classList.remove("hidden")
        });

        textbox.addEventListener("click", function() {
            textbox.classList.add("hidden")
            textbox.innerHTML = "";

        })
    
      
     }
   
}




function capitalization(upperCaseThis) {

    const upperCase = upperCaseThis.charAt(0).toUpperCase() + upperCaseThis.slice(1);

    return upperCase;

}

function dmToCm(dm) {

    cm = dm * 10;
    return cm;

}


function hgToKg(hg) {

    kg = hg / 10;
    return kg;

}

function abilityError(error) {

    textbox.innerHTML = `<p>Error!</p> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.25C10.0716 2.25 8.18657 2.82183 6.58319 3.89317C4.97982 4.96452 3.73013 6.48726 2.99218 8.26884C2.25422 10.0504 2.06114 12.0108 2.43735 13.9021C2.81355 15.7934 3.74215 17.5307 5.10571 18.8943C6.46928 20.2579 8.20656 21.1865 10.0979 21.5627C11.9892 21.9389 13.9496 21.7458 15.7312 21.0078C17.5127 20.2699 19.0355 19.0202 20.1068 17.4168C21.1782 15.8134 21.75 13.9284 21.75 12C21.745 9.41566 20.7162 6.93859 18.8888 5.11118C17.0614 3.28378 14.5843 2.25496 12 2.25ZM15.5344 14.4656C15.6752 14.6078 15.7542 14.7999 15.7542 15C15.7542 15.2001 15.6752 15.3922 15.5344 15.5344C15.391 15.673 15.1994 15.7505 15 15.7505C14.8006 15.7505 14.609 15.673 14.4656 15.5344L12 13.0594L9.53438 15.5344C9.39102 15.673 9.19942 15.7505 9 15.7505C8.80059 15.7505 8.60898 15.673 8.46563 15.5344C8.32479 15.3922 8.24578 15.2001 8.24578 15C8.24578 14.7999 8.32479 14.6078 8.46563 14.4656L10.9406 12L8.46563 9.53437C8.34603 9.38865 8.28491 9.20366 8.29416 9.01537C8.30341 8.82708 8.38236 8.64896 8.51566 8.51566C8.64896 8.38236 8.82708 8.3034 9.01537 8.29416C9.20366 8.28491 9.38866 8.34603 9.53438 8.46563L12 10.9406L14.4656 8.46563C14.6114 8.34603 14.7963 8.28491 14.9846 8.29416C15.1729 8.3034 15.351 8.38236 15.4843 8.51566C15.6176 8.64896 15.6966 8.82708 15.7058 9.01537C15.7151 9.20366 15.654 9.38865 15.5344 9.53437L13.0594 12L15.5344 14.4656Z" />
    </svg>`

}

function abilityBox(text) {


    if(text.effect_entries[1].language.name === "en") {
        textbox.innerHTML = `${text.effect_entries[1].effect} <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2.25C10.0716 2.25 8.18657 2.82183 6.58319 3.89317C4.97982 4.96452 3.73013 6.48726 2.99218 8.26884C2.25422 10.0504 2.06114 12.0108 2.43735 13.9021C2.81355 15.7934 3.74215 17.5307 5.10571 18.8943C6.46928 20.2579 8.20656 21.1865 10.0979 21.5627C11.9892 21.9389 13.9496 21.7458 15.7312 21.0078C17.5127 20.2699 19.0355 19.0202 20.1068 17.4168C21.1782 15.8134 21.75 13.9284 21.75 12C21.745 9.41566 20.7162 6.93859 18.8888 5.11118C17.0614 3.28378 14.5843 2.25496 12 2.25ZM15.5344 14.4656C15.6752 14.6078 15.7542 14.7999 15.7542 15C15.7542 15.2001 15.6752 15.3922 15.5344 15.5344C15.391 15.673 15.1994 15.7505 15 15.7505C14.8006 15.7505 14.609 15.673 14.4656 15.5344L12 13.0594L9.53438 15.5344C9.39102 15.673 9.19942 15.7505 9 15.7505C8.80059 15.7505 8.60898 15.673 8.46563 15.5344C8.32479 15.3922 8.24578 15.2001 8.24578 15C8.24578 14.7999 8.32479 14.6078 8.46563 14.4656L10.9406 12L8.46563 9.53437C8.34603 9.38865 8.28491 9.20366 8.29416 9.01537C8.30341 8.82708 8.38236 8.64896 8.51566 8.51566C8.64896 8.38236 8.82708 8.3034 9.01537 8.29416C9.20366 8.28491 9.38866 8.34603 9.53438 8.46563L12 10.9406L14.4656 8.46563C14.6114 8.34603 14.7963 8.28491 14.9846 8.29416C15.1729 8.3034 15.351 8.38236 15.4843 8.51566C15.6176 8.64896 15.6966 8.82708 15.7058 9.01537C15.7151 9.20366 15.654 9.38865 15.5344 9.53437L13.0594 12L15.5344 14.4656Z" />
        </svg>
        `;
    } else {
        textbox.innerHTML = `${text.effect_entries[0].effect} <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2.25C10.0716 2.25 8.18657 2.82183 6.58319 3.89317C4.97982 4.96452 3.73013 6.48726 2.99218 8.26884C2.25422 10.0504 2.06114 12.0108 2.43735 13.9021C2.81355 15.7934 3.74215 17.5307 5.10571 18.8943C6.46928 20.2579 8.20656 21.1865 10.0979 21.5627C11.9892 21.9389 13.9496 21.7458 15.7312 21.0078C17.5127 20.2699 19.0355 19.0202 20.1068 17.4168C21.1782 15.8134 21.75 13.9284 21.75 12C21.745 9.41566 20.7162 6.93859 18.8888 5.11118C17.0614 3.28378 14.5843 2.25496 12 2.25ZM15.5344 14.4656C15.6752 14.6078 15.7542 14.7999 15.7542 15C15.7542 15.2001 15.6752 15.3922 15.5344 15.5344C15.391 15.673 15.1994 15.7505 15 15.7505C14.8006 15.7505 14.609 15.673 14.4656 15.5344L12 13.0594L9.53438 15.5344C9.39102 15.673 9.19942 15.7505 9 15.7505C8.80059 15.7505 8.60898 15.673 8.46563 15.5344C8.32479 15.3922 8.24578 15.2001 8.24578 15C8.24578 14.7999 8.32479 14.6078 8.46563 14.4656L10.9406 12L8.46563 9.53437C8.34603 9.38865 8.28491 9.20366 8.29416 9.01537C8.30341 8.82708 8.38236 8.64896 8.51566 8.51566C8.64896 8.38236 8.82708 8.3034 9.01537 8.29416C9.20366 8.28491 9.38866 8.34603 9.53438 8.46563L12 10.9406L14.4656 8.46563C14.6114 8.34603 14.7963 8.28491 14.9846 8.29416C15.1729 8.3034 15.351 8.38236 15.4843 8.51566C15.6176 8.64896 15.6966 8.82708 15.7058 9.01537C15.7151 9.20366 15.654 9.38865 15.5344 9.53437L13.0594 12L15.5344 14.4656Z" />
        </svg>`;
    }

}

async function fetchAbility() {
    try {
        const response = await fetch(abilityUrl);
        const answer = await response.json();
        abilityBox(answer);

    } catch {
        abilityError();
    }
   
}
