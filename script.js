'use strict';

// getting element from html and assigning it to a variable

let player0 = document.querySelector('.player--0');

let player1 = document.querySelector('.player--1');

let player0Score = document.getElementById('score--0');

let player1Score = document.getElementById('score--1');

let player0CurrentScore = document.getElementById('current--0');

let player1CurrentScore = document.getElementById('current--1');

let newGameBtn = document.getElementById('new-game');

let rollDiceBtn = document.getElementById('roll-dice');

let holdBtn = document.getElementById('hold');

let dice = document.querySelector('.dice');

let scores, currentScore, activePlayer, playing;

// creating a New Game function
let newGame = function () {
  // setting all default score to 0
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  player0Score.innerText = 0;
  player1Score.innerText = 0;
  player0CurrentScore.innerText = 0;
  player1CurrentScore.innerText = 0;

  player1.classList.remove('player--active');
  player0.classList.add('player--active');

  //make dice not visible
  dice.classList.add('hidden');

  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');

  document.querySelector('#name--0').textContent = 'Player 1';
  document.querySelector('#name--1').textContent = 'Player 2';
};

//Start Game
newGame();

//create a switch player function
const switchPlayer = function () {
  //set current score to 0
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).innerText = 0;

  //switch active player
  activePlayer = activePlayer === 0 ? 1 : 0;

  //change active player background color
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

//add roll dice button functionality
rollDiceBtn.addEventListener('click', function () {
  if (playing) {
    //make dice visible
    dice.classList.remove('hidden');

    //generate a random number when player roll the dice
    let diceNumber = Math.trunc(Math.random() * 6) + 1;

    //display dice image with number equal to the random number generated
    dice.src = `dice-${diceNumber}.png`;

    //set player current score to the current score + dice number rolled
    currentScore += diceNumber;

    //check if dice number is not equal to 1
    if (diceNumber !== 1) {
      document.getElementById(`current--${activePlayer}`).innerText =
        currentScore;

      // player0CurrentScore.innerText = currentScore
    }

    //if dice number is 1 set current score to 0 and switch player
    else {
      switchPlayer();
    }
  }
});

//add Hold button functionality
holdBtn.addEventListener('click', function () {
  if (playing) {
    //hold the current score by adding the current score to the total score
    scores[activePlayer] += currentScore;

    //get each player score from the array of scores
    document.getElementById(`score--${activePlayer}`).innerText =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document.querySelector(`#name--${activePlayer}`).textContent = 'winner';
    }

    //switch player
    switchPlayer();
  }
});

//add new game or reset functinality
newGameBtn.addEventListener('click', newGame);
