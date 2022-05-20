'use strict';

// Selecting Elements
const score1El = document.querySelector('.player1Score');
const score2El = document.querySelector('.player2Score');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btnRollDice');
const btnNew = document.querySelector('.btnNewGame');
const btnHo = document.querySelector('.btnHold');
const player1CurrentScoreEl = document.querySelector('.player1CurrentScore');
const player2CurrentScoreEl = document.querySelector('.player2CurrentScore');
const player1BoardEl = document.querySelector('.player1Board');
const player2BoardEl = document.querySelector('.player2Board');

// Startig conditions
score1El.textContent = 0;
score2El.textContent = 0;
player1CurrentScoreEl.textContent = 0;
player2CurrentScoreEl.textContent = 0;
diceEl.classList.add('hidden');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 1;

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  // 1.Generating a random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;
  console.log(dice);

  // 2. Display the dice
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;

  //3. Check for rolled 1: if true, switch to next player; if no add dice score to current score
  if (dice !== 1) {
    // Add the dice to the current score
    currentScore = currentScore + dice;
    document.querySelector(`.player${activePlayer}CurrentScore`).textContent =
      currentScore;
  } else {
    // Set the current score of the active player who rolled a 1 to 0
    document.querySelector(
      `.player${activePlayer}CurrentScore`
    ).textContent = 0;
    // Set the current score variable back to 0 for fresh calculation
    currentScore = 0;
    // Switch to the next player
    activePlayer = activePlayer === 1 ? 2 : 1;
    //switch the backgroung to highlight the next player
    player1BoardEl.classList.toggle('player-active');
    player2BoardEl.classList.toggle('player-active');
  }
});
