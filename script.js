class Game {
  constructor(player1, player2 = { name: "pc", figure: "O", wins: 0 }) {
    this.player1 = player1;
    this.player2 = player2;
    this.player1.figure = this.figX;
    this.player2.figure = this.figO;
  }
  figX = "X";
  figO = "O";
  currentFigure = this.figX;
  currentPlayer = this.player1;
  combinations = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [3, 4, 5],
    [6, 7, 8],
    [6, 4, 2],
    [1, 4, 7],
    [2, 5, 8],
  ];
  //I don't know how to push the array up to 9 items without using a for loop
  grid = [];
  webGrid = document.querySelector(".grid");
  resetBtn = document.querySelector(".reset");
  gameOver = false;
  webGameOver = document.createElement("div");
  brandedSound = new Audio("sfx/grill.mp3");
  shotSound = new Audio("sfx/gun.mp3");
  createGridElement() {
    const gridElement = document.createElement("div");
    gridElement.classList.add("grid-element");
    return gridElement;
  }
  createGrid() {
    for (let i = 0; i < 9; i++) {
      this.grid.push(this.createGridElement());
      this.grid[i].setAttribute("id", `${i}`);
      this.grid[i].addEventListener("click", (e) => this.setFigure(e.target));
      this.webGrid.appendChild(this.grid[i]);
    }
    this.resetBtn.addEventListener("click", () => {
      this.reset();
    });
  }
  setCurrentPlayer(figure) {
    figure === this.figX
      ? (this.currentPlayer = this.player1)
      : (this.currentPlayer = this.player2);
  }
  isMarked(target) {
    if (
      target.classList.contains("branded") ||
      target.classList.contains("shot")
    ) {
      return true;
    }
    return false;
  }
  setFigure(target) {
    if (this.isMarked(target) || this.gameOver) {
      return;
    } else {
      if (this.currentFigure === this.figX) {
        this.brandedSound.play();
        target.classList.add("branded");
        target.textContent = this.figX;
        this.currentFigure = this.figO;
        this.setCurrentPlayer(this.currentFigure);
        if (this.checkWin() === "Tie" || this.checkWin() === true) {
          this.endGame();
        }
      } else if (this.currentFigure === this.figO) {
        this.shotSound.play();
        target.classList.add("shot");
        target.textContent = this.figO;
        this.currentFigure = this.figX;
        this.setCurrentPlayer(this.currentFigure);
        if (this.checkWin() === "Tie" || this.checkWin() === true) {
          this.endGame();
        }
      }
    }
  }
  //I will try doing this again but with an object that stores all the variables created here.
  checkWin() {
    let contX;
    let contO;
    let three = false;
    let contT = 0;
    this.grid.forEach((element) => {
      if (
        element.classList.contains("shot") ||
        element.classList.contains("branded")
      ) {
        contT += 1;
      }
    });
    if (contT === 9) {
      return "Tie";
    }
    this.combinations.forEach((combination) => {
      contX = 0;
      contO = 0;
      combination.forEach((e) => {
        if (this.grid[e].classList.contains("branded")) {
          contX += 1;
          if (contX === 3) {
            three = true;
            return;
          }
        }
        if (this.grid[e].classList.contains("shot")) {
          contO += 1;
          if (contO === 3) {
            three = true;
            return;
          }
        }
      });
    });
    return three;
  }
  reset() {
    this.grid = [];
    this.webGrid.replaceChildren();
    this.webGameOver.remove();
    this.gameOver = false;
    this.createGrid();
  }
  endGame() {
    this.gameOver = true;
    this.webGameOver.classList.add("game-over");
    this.webGameOver.textContent = "Game Over";
    document.querySelector("main").appendChild(this.webGameOver);
  }
}

//To fully implement the rest of the fields in a future update
class Player {
  name;
  figure;
  wins;
}
const player = new Player();
const game1 = new Game(player);
game1.createGrid();
