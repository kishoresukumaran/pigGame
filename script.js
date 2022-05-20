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
const player1NameEl = document.querySelector('.player1Name');
const player2NameEl = document.querySelector('.player2Name');
const btnCloseModal = document.querySelector('.close-modal');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

let scores;
let currentScore;
let activePlayer;
let playing;

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 1;
  playing = true;

  score1El.textContent = 0;
  score2El.textContent = 0;
  player1NameEl.textContent = 'Player 1';
  player2NameEl.textContent = 'Player 2';
  player1CurrentScoreEl.textContent = 0;
  player2CurrentScoreEl.textContent = 0;

  diceEl.classList.add('hidden');
  player1BoardEl.classList.remove('player-winner');
  player2BoardEl.classList.remove('player-winner');
  player1BoardEl.classList.add('player-active');
  player2BoardEl.classList.remove('player-active');
};

init();

const switchPlayer = function () {
  // Set the current score of the active player who rolled a 1 to 0
  document.querySelector(`.player${activePlayer}CurrentScore`).textContent = 0;
  // Set the current score variable back to 0 for fresh calculation
  currentScore = 0;
  // Switch to the next player
  activePlayer = activePlayer === 1 ? 2 : 1;
  //switch the backgroung to highlight the next player
  player1BoardEl.classList.toggle('player-active');
  player2BoardEl.classList.toggle('player-active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
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
      switchPlayer();
    }
  }
});

btnHo.addEventListener('click', function () {
  if (playing) {
    //1. Add current score to active player's score
    scores[activePlayer - 1] += currentScore;
    document.querySelector(`.player${activePlayer}Score`).textContent =
      scores[activePlayer - 1];
    //2. Check if player's score is >=100
    //Fininsh Game
    if (scores[activePlayer - 1] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player${activePlayer}Board`)
        .classList.add('player-winner');
      document.querySelector(
        `.player${activePlayer}Name`
      ).textContent = `Player ${activePlayer} Wins`;
      document
        .querySelector(`.player${activePlayer}Board`)
        .classList.remove('player-active');
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
btnCloseModal.addEventListener('click', closeModal);
