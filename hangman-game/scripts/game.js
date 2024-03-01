const hangmanParts = [head, body, leftHand, rightHand, leftLeg, rightLeg];
const randomWorlds = {
  Football: [
    "Messi",
    "Rooney",
    "CristianoRonaldo",
    "Ronaldo",
    "Ramos",
    "Benzema",
    "Salah",
    "Mahrez",
    "Hakimi",
    "Kaka",
    "Pele",
  ],
  Movies: [
    "Prestige",
    "Inception",
    "Paratise",
    "Interstellar",
    "whiplash",
    "Memento",
    "Coco",
    "Up",
  ],
  People: [
    "AlbertEinstein",
    "Hitchcock",
    "Alexander",
    "Cleopatra",
    "MahatmaGhandi",
  ],
  Countries: [
    "Lebanon",
    "Syria",
    "America",
    "Qatar",
    "Egypt",
    "Yemen",
    "Spain",
    "Germany",
    "Iran",
    "Jordan",
    "Italy",
    "Canada",
    "Mexcico",
    "Brazil",
    "France",
    "SouthAfrica",
    "Algeria",
    "China",
    "SouthKorea",
    "Russia",
  ],
};
const wrongSound = new Audio(
  "./assets/sounds/554053__gronkjaer__wronganswer.mp3"
);
const correctSound = new Audio(
  "./assets/sounds/554055__gronkjaer__rightanswer.mp3"
);
let gameContainer = document.querySelector(".game");
let allKeys = Object.keys(randomWorlds);
let randomKeyNumber = Math.floor(Math.random() * allKeys.length);
let randomKeyName = allKeys[randomKeyNumber];
let randomKeyValue = randomWorlds[randomKeyName];

let randomValueNumber = Math.floor(Math.random() * randomKeyValue.length);
let randomValueValue = randomKeyValue[randomValueNumber];
let arrayFromLetters = Array.from(randomValueValue);
let answerSection = document.getElementById("answer-section");
let answerSpans = [];
arrayFromLetters.forEach((letter) => {
  let answerSpan = document.createElement("span");
  answerSpan.style.cssText =
    "width: 55px; height: 55px; display: inline-block; color: black; border-bottom: 1px solid #5d63b9; font-size: 22px; margin-right: 10px; margin-bottom: 10px; line-height: 55px; font-weight: bold; text-transform: uppercase;";
  answerSection.appendChild(answerSpan);
  answerSpans.push(answerSpan);
});
let wrongAttempts = 0;
let correctAttmempts = 0;
function playWrongSound() {
  wrongSound.play();
}
function playCorrectSound() {
  correctSound.play();
}
function winGame() {
  let parrentDiv = document.createElement("div");
  parrentDiv.style.cssText = `position: absolute;
    background-color: #5d63b9;
    padding: 100px 20px;
    width: 100%;
    top: 0;
    left: 0;
    height: 100%;
    color: #fff;
    display:flex;
    gap:10px;
    flex-direction:column;
    justify-content: center;
    align-items:center;
    text-align: center;
    border-radius: 15px;
    font-size: 35px;
    border: 1px solid #ccc;`;
  let button = document.createElement("button");
  let buttonText = document.createTextNode("Play again");
  button.style.cssText = ` padding: 8px 15px; border: none; 
    background-color: rgb(58 251 11); color: #fff; border-radius: 3px; cursor: pointer;  `;
  button.appendChild(buttonText);
  let div = document.createElement("div");

  let divText = document.createTextNode(
    `You Win,The word was ${randomValueValue}`
  );
  div.appendChild(divText);
  parrentDiv.appendChild(div);
  parrentDiv.appendChild(button);
  gameContainer.style.position = "relative";
  gameContainer.appendChild(parrentDiv);
  button.addEventListener("click", function () {
    window.location.reload();
  });
}
function endGame() {
  let parrentDiv = document.createElement("div");
  parrentDiv.style.cssText = `position: absolute;
    background-color: #5d63b9;
    padding: 100px 20px;
    width: 100%;
    top: 0;
    left: 0;
    height: 100%;
    color: #fff;
    display:flex;
    gap:10px;
    flex-direction:column;
    justify-content: center;
    align-items:center;
    text-align: center;
    border-radius: 15px;
    font-size: 35px;
    border: 1px solid #ccc;`;
  let button = document.createElement("button");
  let buttonText = document.createTextNode("Play again");
  button.style.cssText = ` padding: 8px 15px; border: none; 
    background-color: rgb(58 251 11); color: #fff; border-radius: 3px; cursor: pointer;  `;
  button.appendChild(buttonText);
  let div = document.createElement("div");

  let divText = document.createTextNode(
    `You Lost, The word was ${randomValueValue}`
  );
  div.appendChild(divText);
  parrentDiv.appendChild(div);
  parrentDiv.appendChild(button);
  gameContainer.style.position = "relative";
  gameContainer.appendChild(parrentDiv);
  button.addEventListener("click", function () {
    window.location.reload();
  });
}
function userKeyBoradInput(e) {
  if (/^[a-zA-Z]$/.test(e.key)) {
    playGame(e.key);
  }
}
function playGame(letter) {
  let theStatus = false;
  if (/^[a-zA-Z]$/.test(letter)) {
    let clickedLetter = letter.toLowerCase();
    let chosenWord = Array.from(randomValueValue.toLowerCase());

    chosenWord.forEach((wordletter, wordIndex) => {
      if (clickedLetter === wordletter) {
        theStatus = true;
        answerSpans[wordIndex].innerHTML = wordletter;
        playCorrectSound();
      }
      if (clickedLetter === wordletter && wordletter !== "") {
        correctAttmempts++;
      }
    });
  }
  if (!theStatus) {
    wrongAttempts++;
    playWrongSound();
    if (wrongAttempts <= hangmanParts.length) {
      hangmanParts[wrongAttempts - 1]();
    }
  }
  if (wrongAttempts === 6 || correctAttmempts === randomValueValue.length) {
    document.removeEventListener("keydown", userKeyBoradInput);
  }
  if (wrongAttempts === 6) {
    endGame();
  }
  if (correctAttmempts === randomValueValue.length) {
    winGame();
  }
}
document.querySelector(".letters").addEventListener("click", function (e) {
  if (e.target.className === "letter") {
    e.target.classList.add("pressed");
    e.target.style.cssText = "pointer-events: none;";
    playGame(e.target.innerHTML);
  }
});
document.addEventListener("keydown", userKeyBoradInput);
