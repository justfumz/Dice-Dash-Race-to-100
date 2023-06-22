'use strict';

const scorePlayer0 = document.querySelector('#score--0');
const scorePlayer1 = document.querySelector('#score--1');
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
const currentScorePlayer1 = document.querySelector('#current--0');
const currentScorePlayer2 = document.querySelector('#current--1');
const dice = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnReset = document.querySelector('.btn--new');

scorePlayer0.textContent = 0;
scorePlayer1.textContent = 0;
dice.classList.add('hidden');

let currentScore = 0;
let activePlayer = 0;
let scores = [0, 0];
//Boolean was added to ensure the none of the buttons work
//when the target number has been reached
//i.e if total=100/20 is false roll & hold should not be clickable
let playing = true;

function toggleCSS() {
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
}

function switchPlayer() {
  //You lose if you roll a 1 and all your point reset to 0
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  //Sets the current score to the dice rolled
  currentScore = 0;
  //Literally means: is active player player 0
  //if yes Set the active player to 1 else set to player 0
  activePlayer = activePlayer === 0 ? 1 : 0;
  //remove the css if it is present and adds if it is absent
  toggleCSS();
}

const rollDice = () => {
  if (playing) {
    //generate a random number between 1-6
    const randomDice = Math.trunc(Math.random() * 6) + 1;
    //Make our dice visible when the player clicks on the roll dice btn
    dice.classList.remove('hidden');
    //change the src of the image using the random number generated
    dice.src = `img/dice-${randomDice}.png`;
    //switch player when 1 is generated
    if (randomDice != 1) {
      //Sets the current score to the dice rolled
      currentScore += randomDice;
      //Makes sure the current score is added to the active player
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
};

const holdScore = () => {
  if (playing) {
    //Active player array is used to add the current total
    //score to the active player's total score
    //scores[activePlayer] literally represents arr[0 or 1]
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      //i.e if total=100/20 is false roll & hold should not be clickable
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      //hides the dice when target has been reached
      dice.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
};

//Add event listener to our "Roll Dice" button
btnRoll.addEventListener('click', rollDice);

//Add event listener to our "Hold" button
btnHold.addEventListener('click', holdScore);

//Reset our game to defaults
btnReset.addEventListener('click', function () {
  scorePlayer0.textContent = 0;
  scorePlayer1.textContent = 0;
  currentScorePlayer1.textContent = 0;
  currentScorePlayer2.textContent = 0;

  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;

  dice.classList.add('hidden');
  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner');
  player1.classList.add('player--active');
  player2.classList.remove('player--active');
});
