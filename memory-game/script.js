/*
Part Two - Implementing clicks and matches
Clicking a card should change the background color to be the color of the class it has.
Users should only be able to change at most two cards at a time.
Clicking on two matching cards should be a “match” — those cards should stay face up.
When clicking two cards that are not a match, they should stay turned over for at least 1 second before they hide the color again. You should make sure to use a setTimeout so that you can execute code after one second.
Part Three - Gotchas
Make sure this works only if you click on two different cards — clicking the same card twice shouldn’t count as a match!)
Make sure that you can not click too quickly and guess more than two cards at a time.
Further Study
Add a button that when clicked will start the game
Add a button that when clicked will restart the game once it has ended
For every guess made, increment a score variable and display the score while the game is played
Store the lowest-scoring game in local storage, so that players can see a record of the best game played.
Allow for any number of cards to appear
Instead of hard-coding colors, try something different like random colors or even images!
*/

let CanRestart = true;
let Guesses = 0;
let Correct = 0;
const gameContainer = document.getElementById("game");
const RestartButton = document.querySelector('.restart');
const Score = document.querySelector('.score');
const Best = document.querySelector('.best');
const Notification = document.querySelector('.notification');
const NumberOfColors = document.querySelector('input.color-num');

try
{
  Best.innerText = JSON.parse(localStorage.best);
}
catch
{}

let COLORS = []

function getColors(number)
{
  if(number > 20)
  {
    number = 15;
  }
  else if(number <2)
  {
    number = 2;
  }
  while(number>0)
  {
    const r = Math.floor(Math.random()*255);
    const g = Math.floor(Math.random()*255);
    const b = Math.floor(Math.random()*255);
    COLORS.push(`rgb(${r},${g},${b})`);
    COLORS.push(`rgb(${r},${g},${b})`);
    number--;
  }
}


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
    newDiv.style.backgroundColor = 'white';
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}

let FaceUp = 0;
function handleCardClick(event)
{
  if(FaceUp<2 && !(event.target.className.includes('up')))
  {
    myColor = event.target.classList;
    event.target.style.backgroundColor = myColor;
    Notification.innerText = '...';
  }
  if(FaceUp == 1 && !(event.target.className.includes('up')))
  {
    event.target.classList.toggle("up");
    FaceUp++;
    CanRestart = false;
    RestartButton.classList.toggle('blocked');
    setTimeout(function(){
      checkColors();
    },1000)
  }
  else if (FaceUp == 0)
  {
    event.target.classList.toggle("up");
    FaceUp++;
  }
}

function checkColors()
{
  Guesses++;
  Score.innerText = Guesses;
  const myCards = document.querySelectorAll(".up");
  if(myCards[0].className == myCards[1].className)
  {
    myCards[0].classList.toggle('up');
    myCards[1].classList.toggle('up');
    Correct++;
    Notification.innerText = "Correct!";
    if(Correct == (COLORS.length)/2 && Best.innerText > Guesses)
    {
      Notification.innerText = "New best score!";
      Best.innerText = Guesses;
      localStorage.setItem('best', Guesses);
    }
    else if(Correct == (COLORS.length)/2 && !(Best.innerText > Guesses))
    {
      Notification.innerText = "You win!";
      Best.innerText = Guesses;
      localStorage.setItem('best', Guesses);
    }
  }
  else
  {
    Notification.innerText = "Incorrect!";
    myCards[0].classList.toggle('up');
    myCards[1].classList.toggle('up');
    myCards[0].style.backgroundColor = 'white';
    myCards[1].style.backgroundColor = 'white';
  }
  FaceUp = 0;
  CanRestart = true;
  RestartButton.classList.toggle('blocked');
}

RestartButton.addEventListener('click',function(event)
{
  if(CanRestart)
  {
    let myNum = 4;
    try
    {
      myNum = parseInt(NumberOfColors.value);
    }
    catch
    {
      myNum = 4;
    }
    getColors(myNum);
    gameContainer.innerText = '';
    event.target.innerText = "Restart Game";
    Notification.innerText = 'Click to flip a card.';
    createDivsForColors(shuffle(COLORS));
    Guesses = 0;
    Score.innerText = '0';
  }
})

