// ☘️☘️☘️ initial setup
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 🔥🔥🔥 write code from here...
// 🌏🌏🌏 Global Declarations
const size = 30;
const board = [];
const lengthOfBoard = 100;
const lengthOfSnake = 4;
const snake = [];
let direction = "right";
const foodPos = {
  x: 6,
  y: 5,
};

const initSnake = () => {
  for (let i = lengthOfSnake - 1; i >= 0; i--) {
    snake.push({ x: i, y: 0 });
  }
};
initSnake();

// draw cell
const drawCell = (col, row, fill = "black", stroke = "white") => {
  const x = col * size;
  const y = row * size;

  ctx.fillStyle = fill;
  ctx.fillRect(x, y, size, size);
  ctx.strokeStyle = stroke;
  ctx.strokeRect(x, y, size, size);
};

// move snake
const moveSnake = () => {
  let HeadX = snake[0].x;
  let HeadY = snake[0].y;

  if (direction == "right") {
    HeadX++;
  } else if (direction == "left") {
    HeadX--;
  } else if (direction == "up") {
    HeadY--;
  } else {
    HeadY++;
  }
  let tail = snake.pop();
  tail.x = HeadX;
  tail.y = HeadY;
  snake.unshift(tail);
};

// draw board
const drawBoard = (length) => {
  for (let i = 0; i < length; i++) {
    board.push({ x: i % 10, y: parseInt(i / 10) });
  }

  for (let i = 0; i < board.length; i++) {
    drawCell(board[i].x, board[i].y);
  }
};
drawBoard(lengthOfBoard);

// draw Snake
const drawSnake = () => {
  for (let i = 0; i < board.length; i++) {
    drawCell(board[i].x, board[i].y, "black", "white");
  }
  console.log(snake);
  for (let i = 0; i < snake.length; i++) {
    drawCell(snake[i].x, snake[i].y, "lime", "black");
  }
  moveSnake();
};
drawSnake();
// draw food
const drawFood = () => {
  const x = foodPos.x * size + size / 2;
  const y = foodPos.y * size + size / 2;

  ctx.beginPath();
  ctx.fillStyle = "purple";
  ctx.arc(x, y, size / 2 - 5, 0, 2 * Math.PI);
  ctx.fill();
};
drawFood();

// 📽️📽️📽️ animation
const animation = () => {
  // moveSnake("right");

  drawSnake();
};

document.addEventListener("keydown", (e) => {
  const key = e.which;
  if (key == 39 && direction != "left") {
    direction = "right";
  } else if (key == 40 && direction != "up") {
    direction = "down";
  } else if (key == 38 && direction != "down") {
    direction = "up";
  } else if (key == 37 && direction != "right") {
    direction = "left";
  }
  console.log("hey", direction);
  // Game loop
  // setInterval(drawSnake, 1000);
  window.requestAnimationFrame(drawSnake);
});
