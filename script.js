'use strict';

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const $rulesBtn = $('#rules-btn');
const $aboutBtn = $('#about-btn');
const $checkBtn = $('#check-btn');
const $againBtn = $('#again-btn');
const $closeModal = $$('#close-modal-btn');
const $message = $('#message');
const $score = $('#score');
const $highscore = $('#highscore');
const $secretBox = $('#secret-box');
const $body = $('body');

const generateRandom = () => Math.ceil(Math.random() * 20);

const changeMessage = (msg) => {
  $message.textContent = msg;
};

const changeScore = (score) => {
  $score.textContent = score;
};

const changeHighscore = (score) => {
  $highscore.textContent = score;
};

const changeUI = (input, number) => {
  $secretBox.textContent = number;
  $secretBox.style.width = '10rem';
  if (input === number) {
    $body.style.backgroundColor = 'green';
    return;
  }
  $body.style.backgroundColor = 'red';
};

const init = () => {
  score = 20;
  changeScore(score);
  changeMessage('❓ Start Guessing...');
  $secretBox.textContent = '?';
  $secretBox.style.width = '5rem';
  $body.style.backgroundColor = 'black';
  $('#input').value = '';
  secretNumber = generateRandom();
};

const checkNumber = (input, number) => {
  score--;
  if (input > number) {
    changeMessage('📈 Too high!');
  } else {
    changeMessage('📉 Too low!');
  }
  changeScore(score);
};

let secretNumber = generateRandom();
let score = 20;
let highscore = 0;

$checkBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const $input = Number($('#input').value);
  if (typeof $input != 'number' || $input === 0) {
    changeMessage('❌ Not a valid number!');
    return;
  }
  if ($input === secretNumber) {
    changeMessage('🎉 You win!');
    highscore = score > highscore ? score : highscore;
    changeHighscore(highscore);
    changeUI($input, secretNumber);
    return;
  }
  if (score < 2) {
    changeMessage('💥 You lose!');
    changeScore(0);
    changeUI($input, secretNumber);
    return;
  }
  checkNumber($input, secretNumber);
});

$againBtn.addEventListener('click', (e) => {
  e.preventDefault();
  init();
});

$rulesBtn.addEventListener('click', () => {
  $('[data-modal="rules"]').showModal();
});

$aboutBtn.addEventListener('click', () => {
  $('[data-modal="about"]').showModal();
});

$closeModal.forEach((closeBtn) => {
  closeBtn.addEventListener('click', (e) => e.target.offsetParent.close());
});
