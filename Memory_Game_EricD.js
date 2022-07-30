

const gameContainer = document.getElementById("game");

let score = 0;
let matches = 0;
let firstCard;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

function shuffle(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.classList.add("card-div");
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}


function handleCardClick(event) {
  let clickedCard = event.target;
  if (clickedCard.classList.contains("matched") || 
  firstCard === clickedCard) {
    return;
  }
  clickedCard.style.backgroundColor = clickedCard.classList[0];
  if(firstCard) {
    if(clickedCard.style.backgroundColor === firstCard.style.backgroundColor) {
      score += 10;
      matches += 1;
      firstCard.classList.add("matched");
      clickedCard.classList.add("matched");
      firstCard = undefined;
    }
    else {
      score -= 2
      setTimeout(() => {
        clickedCard.style.backgroundColor = "rgb(230, 229, 227)";
        firstCard.style.backgroundColor = "rgb(230, 229, 227)";
        firstCard = undefined;
      }, 1500)
    }
  }
  else {
   firstCard = clickedCard;
  }
  if(matches === 5){
    document.getElementById("ending").innerHTML = `You Won!`;
  }
  document.getElementById("score").innerHTML = `Score: ${score}`;
};

function restartGameboard () {
    let cardDivs = document.querySelectorAll('.card-div');
    for(card of cardDivs) {
      card.remove();
    }
  };

const startGame = document.querySelector("#start-game")

startGame.addEventListener("click", function(){
  score = 0;
  matches = 0;
  document.getElementById("ending").innerHTML = "";
  document.getElementById("score").innerHTML = `Score: ${score}`;
  restartGameboard();
  let shuffledColors = shuffle(COLORS);
  createDivsForColors(shuffledColors);
});