const squares = document.querySelectorAll(".square");
const gameInfo = document.querySelector(".game-info");
const restartBtn = document.querySelector(".restart");

const winCondition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let option = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

initializeGame();

function initializeGame() {
  squares.forEach((square) => {
    square.addEventListener("click", squareClicked);
  });

  gameInfo.innerHTML = `${currentPlayer}'s turn!`;

  restartBtn.addEventListener("click", restart);

  running = true;
}

function squareClicked() {
  const squareIndex = this.getAttribute("squareIndex");

  if (option[squareIndex] != "" || !running) {
    return;
  }

  updateSquare(this, squareIndex);
  checkWinner();
}

function updateSquare(square, index) {
  option[index] = currentPlayer;
  square.innerHTML = currentPlayer;
}

function changePlayer() {
  currentPlayer = currentPlayer == "X" ? "O" : "X";
  gameInfo.innerHTML = `${currentPlayer}'s turn!`;
}

function checkWinner() {
  let roundWon = false;

  for (let i = 0; i < winCondition.length; i++) {
    const opt = winCondition[i];
    const squareA = option[opt[0]];
    const squareB = option[opt[1]];
    const squareC = option[opt[2]];

    if (squareA == "" || squareB == "" || squareC == "") {
      continue;
    }

    if (squareA == squareB && squareB == squareC) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    gameInfo.innerHTML = `${currentPlayer}'s wins!`;
    running = false;
  } else if (!option.includes("")) {
    gameInfo.innerHTML = `Draw!`;
    running = false;
  } else {
    changePlayer();
  }
}

function restart() {
  currentPlayer = "X";
  option = ["", "", "", "", "", "", "", "", ""];
  gameInfo.innerHTML = `${currentPlayer}' turn!`;
  squares.forEach((square) => (square.innerHTML = ""));
  running = true;
}
