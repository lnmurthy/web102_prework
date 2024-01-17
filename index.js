/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

//import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

//create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

//remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}


/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

//grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

//create a function that adds all data from the games array to the page
function addGamesToPage(games) { 
    //loop through each game 
    for (const game of games) { 
        //new div element for each game 
        const gameCard = document.createElement("div");
        gameCard.classList.add("game-card"); 
        //set html of the new div using the game data
        gameCard.innerHTML = `
        <h3>${game.name}</h3>
        <p>${game.description}</p>
        <p>Pledged: $${game.pledged.toLocaleString()}</p>
        <p>Backers: ${game.backers}</p>
        <img src="${game.img}" alt="${game.name}" class="game-img" />
    `;
        gamesContainer.appendChild(gameCard);
    }
}

addGamesToPage(GAMES_JSON);



/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/
window.addEventListener("load", () => {
    const contributionsCard = document.getElementById("num-contributions");
    const totalContributions = GAMES_JSON.reduce((total, game) => {
      return total + game.backers;
    }, 0);

    //set the inner HTML using a template literal and toLocaleString to get a number with commas
    contributionsCard.innerHTML = totalContributions.toLocaleString();
  
    const raisedCard = document.getElementById("total-raised");
      const totalRaised = GAMES_JSON.reduce((total, game) => {
      return total + game.pledged;
    }, 0);
  
    raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;
  
    const gamesCard = document.getElementById("num-games");
    gamesCard.innerHTML = GAMES_JSON.length;
  });


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/
document.addEventListener("DOMContentLoaded", () => { 
    //gets unfunded button with an event listener
    const unfundedBtn = document.getElementById("unfunded-btn");
    unfundedBtn.addEventListener("click", filterUnfundedOnly);
    //shows unfunded games 
    function filterUnfundedOnly() {
        deleteChildElements(gamesContainer);
        //filter for a list of games that have not been funded to the goal yet 
        const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);

        console.log("# of unfunded games:", unfundedGames.length);
        addGamesToPage(unfundedGames);
    }
});


document.addEventListener("DOMContentLoaded", () => {
    const fundedBtn = document.getElementById("funded-btn");
    fundedBtn.addEventListener("click", filterFundedOnly);
    //clear the game cards that are existing
    deleteChildElements(gamesContainer);

    function filterFundedOnly() {
        //check for games that have met or over met the goal 
        const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);

        console.log("# of funded games:", fundedGames.length);

        addGamesToPage(fundedGames);
    }
});

//show all the games 
document.addEventListener("DOMContentLoaded", () => {
    const allBtn = document.getElementById("all-btn");
    allBtn.addEventListener("click", showAllGames);

    deleteChildElements(gamesContainer);

    function showAllGames() {
        addGamesToPage(GAMES_JSON);
    }
});


//repetitive code 
//defining event handlers for the unfunded, unfunded, and all games
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");


document.addEventListener("DOMContentLoaded", () => {
    const unfundedBtn = document.getElementById("unfunded-btn");
    const fundedBtn = document.getElementById("funded-btn");
    const allBtn = document.getElementById("all-btn");

    unfundedBtn.addEventListener("click", filterUnfundedOnly);
    fundedBtn.addEventListener("click", filterFundedOnly);
    allBtn.addEventListener("click", showAllGames);

    deleteChildElements(gamesContainer);

    //define the event handlers
    function filterUnfundedOnly() {
        const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
        console.log("# of unfunded games:", unfundedGames.length);
        addGamesToPage(unfundedGames);
    }

    function filterFundedOnly() {
        const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);
        console.log("# of funded games:", fundedGames.length);
        addGamesToPage(fundedGames);
    }

    function showAllGames() {
        addGamesToPage(GAMES_JSON);
    }
});

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

const descriptionContainer = document.getElementById("description-container");
//get number of unfunded games
const numberOfUnfundedGames = GAMES_JSON.reduce((count, game) => {
    return game.pledged < game.goal ? count + 1 : count;
  }, 0);
  //show in log 
  console.log("# of unfunded games:", numberOfUnfundedGames);
  
//createa a string based on the unfunded games 
const explanationString = numberOfUnfundedGames === 0
  ? "all of the games are funded"
  : numberOfUnfundedGames === 1
  ? "there is a game that is unfunded"
  : `${numberOfUnfundedGames} unfunded games. donate!`;

console.log(explanationString);

//new paragraph element 
const explanationParagraph = document.createElement("p");

//set the inner HTML of the paragraph using the explanationString
explanationParagraph.innerHTML = explanationString;

descriptionContainer.appendChild(explanationParagraph);
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

//container elements in the html
const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");
//games in descending order on pledged amount
const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

//grab the first and second games
const [firstGame, secondGame, ...restOfGames] = sortedGames;
const firstGameElement = document.createElement("p");
firstGameElement.textContent = `Top Funded Game: ${firstGame.name}`;
//appends to the first game to the container in the html
firstGameContainer.appendChild(firstGameElement);
//second games 
const secondGameElement = document.createElement("p");
secondGameElement.textContent = `Second Most Funded Game: ${secondGame.name}`;

secondGameContainer.appendChild(secondGameElement);



