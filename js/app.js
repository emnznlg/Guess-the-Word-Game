const inputsDiv = document.querySelector(".inputs");
const resetBtn = document.querySelector(".reset-btn");
const hint = document.querySelector(".hint span");
const typingInput = document.querySelector(".typing-input");
const remainingGuesses = document.querySelector(".guess-left span");
const wrongLetter = document.querySelector(".wrong-letter span");

let word;
let incorrectLetters = [];
let correctWords = [];
let guessLeft;

function randomWord() {
  let randomObj = wordList[Math.floor(Math.random() * wordList.length)];
  word = randomObj.word;

  guessLeft = 10;
  remainingGuesses.innerText = guessLeft;
  incorrectLetters = [];
  wrongLetter.innerText = incorrectLetters;
  correctWords = [];
  console.log(word);

  hint.innerHTML = randomObj.hint;

  let html = "";
  for (let i = 0; i < word.length; i++) {
    html += `<input type="text" disabled />`;
  }
  inputsDiv.innerHTML = html;
}

randomWord();

function initGame(e) {
  let key = e.target.value;
  if (
    key.match(/^[A-Za-z]+$/) &&
    !incorrectLetters.includes(` ${key}`) &&
    !correctWords.includes(key)
  ) {
    if (word.includes(key)) {
      for (let i = 0; i < word.length; i++) {
        if (word[i] === key) {
          correctWords.push(key);
          inputsDiv.querySelectorAll("input")[i].value = key;
        }
      }
    } else {
      incorrectLetters.push(` ${key}`);
      guessLeft--;
      remainingGuesses.innerText = guessLeft;
    }

    wrongLetter.innerText = incorrectLetters;
  }

  setTimeout(() => {
    if (correctWords.length === word.length) {
      alert(
        `Congrats! You found the word! Correct words is ${word.toUpperCase()}`
      );
      randomWord();
    } else if (guessLeft < 1) {
      remainingGuesses.innerText = 0;
      alert("Your guess is over");
      for (let i = 0; i < word.length; i++) {
        inputsDiv.querySelectorAll("input")[i].value = word[i];
      }

      randomWord();
    }
  }, 500);

  typingInput.value = "";
}

resetBtn.addEventListener("click", randomWord);
typingInput.addEventListener("input", initGame);
document.addEventListener("keydown", () => {
  typingInput.focus();
});
