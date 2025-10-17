const icons = ['🍎', '🍌', '🍇', '🍓', '🍒', '🍍', '🥝', '🍉'];
let cards = [...icons, ...icons];
let firstCard, secondCard;
let lock = false;
let moves = 0;
let time = 0;
let timerInterval;

const board = document.getElementById('board');
const movesDisplay = document.getElementById('moves');
const timerDisplay = document.getElementById('timer');
const restartBtn = document.getElementById('restart');

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function startGame() {
  board.innerHTML = '';
  cards = shuffle(cards);
  moves = 0;
  time = 0;
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    time++;
    timerDisplay.textContent = `Waktu: ${time} dtk`;
  }, 1000);
  movesDisplay.textContent = 'Langkah: 0';

  cards.forEach(icon => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <div class="front">${icon}</div>
      <div class="back">❓</div>
    `;
    card.addEventListener('click', flipCard);
    board.appendChild(card);
  });
}

function flipCard() {
  if (lock) return;
  if (this === firstCard) return;
  this.classList.add('flip');

  if (!firstCard) {
    firstCard = this;
    return;
  }
  secondCard = this;
  moves++;
  movesDisplay.textContent = `Langkah: ${moves}`;
  checkMatch();
}

function checkMatch() {
  const match =
    firstCard.querySelector('.front').textContent ===
    secondCard.querySelector('.front').textContent;
  if (match) {
    disableCards();
  } else {
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetTurn();
  checkWin();
}

function unflipCards() {
  lock = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetTurn();
  }, 800);
}

function resetTurn() {
  [firstCard, secondCard, lock] = [null, null, false];
}

function checkWin() {
  const flippedCards = document.querySelectorAll('.flip').length;
  if (flippedCards === cards.length) {
    clearInterval(timerInterval);
    setTimeout(() => {
      alert(`🎉 Kamu menang!\nLangkah: ${moves}\nWaktu: ${time} detik`);
    }, 400);
  }
}

restartBtn.addEventListener('click', startGame);
startGame();