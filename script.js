// ☘️☘️☘️ initial setup
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const boardSize = 300;
const startPoint = {
  x: (canvas.width - boardSize) / 2,
  y: (canvas.height - boardSize) / 2,
};

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  startPoint.x = (canvas.width - boardSize) / 2;
  startPoint.y = (canvas.height - boardSize) / 2;
  squares = [];
  drawBoard();
  init();
});

// 🔥🔥🔥 write code from here...
let squares = [];

// 🎶 square blueprint
class Square {
  constructor(displacementX, displacementY) {
    this.x = startPoint.x + displacementX;
    this.y = startPoint.y + displacementY;
    this.width = 30;
    this.height = 30;
    this.fillColor = "black";
    this.strokeColor = "white";
  }

  draw() {
    ctx.fillStyle = "black";
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.width, this.y);
    ctx.lineTo(this.x + this.width, this.y + this.height);
    ctx.lineTo(this.x, this.y + this.height);
    ctx.lineTo(this.x, this.y);
    ctx.stroke();
    ctx.fill();
  }
}

// initial setup
// draw board
const drawBoard = () => {
  // making 100 square objects of diff origins
  let x = 0;
  let y = 0;
  for (let i = 0; i < 100; i++) {
    squares.push(new Square(x, y));
    x += 30;
    if (x == 300) {
      x = 0;
      y += 30;
    }
  }
  // drawing whole board
  for (let j = 0; j < squares.length; j++) {
    squares[j].draw();
  }
};

drawBoard();

// drawing snake
const drawSnake = () => {
  const rangeEnd = squares.length - 1;
  const rangeStart = 0;
  const randomPosition = 0;

  for (let i = randomPosition; i < 3; i++) {
    ctx.fillStyle = "white";
    ctx.fillRect(
      startPoint.x + i * squares[0].width,
      startPoint.y + 0 * squares[0].height,
      squares[0].width,
      squares[0].height
    );
  }
};

// drawing snake food
const drawSnakeFood = () => {
  const rangeEnd = squares.length - 1;
  const rangeStart = 0;
  const randomPosition = 5;

  ctx.beginPath();
  ctx.fillStyle = "yellow";
  console.log("hey");
  ctx.arc(
    startPoint.x + 15 + randomPosition * 30,
    startPoint.y + 15,
    7,
    0,
    2 * Math.PI
  );
  ctx.fill();
};

// game initial state
const init = () => {
  drawSnake();
  drawSnakeFood();
};

init();
