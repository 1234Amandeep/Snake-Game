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
let lengthOfSnake = 4;
let snake = [];
let direction = "right";
let score = 0;
const foodPos = {
  x: parseInt(Math.random() * 9 + 0),
  y: parseInt(Math.random() * 9 + 0),
};

const initSnake = () => {
  console.log("init");
  snake = [];
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
    console.log(HeadX + 1, HeadY + 1, lengthOfSnake, snake);
    if (HeadX % 10 == 0) {
      HeadX = 3;
      restart();
      return;
    }
  } else if (direction == "left") {
    HeadX--;
    console.log(HeadX + 1, HeadY + 1, lengthOfSnake, snake);
    console.log(HeadX);
    if (HeadX < 0) {
      HeadX = 3;
      console.log(HeadX + 1, HeadY + 1, lengthOfSnake, snake);
      console.log(HeadX);
      restart();
      return;
    }
  } else if (direction == "up") {
    HeadY--;
    console.log(HeadX + 1, HeadY + 1, lengthOfSnake, snake);
    if (HeadY < 0) {
      HeadY = 0;
      restart();
      return;
    }
  } else {
    HeadY++;
    console.log(HeadX + 1, HeadY + 1, lengthOfSnake, snake);
    if (HeadY > 9) {
      HeadY = 0;
      restart();
      return;
    }
  }
  let tail = snake.pop();
  let tailX = tail.x;
  let tailY = tail.y;

  tail.x = HeadX;
  tail.y = HeadY;
  if (tail.x == foodPos.x && tail.y == foodPos.y) {
    snake.push({ x: tailX, y: tailY });
    foodPos.x = parseInt(Math.random() * 9 + 0);
    foodPos.y = parseInt(Math.random() * 9 + 0);
    score++;
    lengthOfSnake++;
    console.log(score);
  }
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

// draw food
const drawFood = () => {
  const snakeHeadX = snake[0].x - 1;
  const snakeHeadY = snake[0].y;
  const snakeTailX = snake[snake.length - 1].x - 1;
  const snakeTailY = snake[snake.length - 1].y;
  let x = foodPos.x;
  let y = foodPos.y;

  if (
    x <= snakeHeadX &&
    x >= snakeTailX &&
    y <= snakeHeadY &&
    y >= snakeTailY
  ) {
    foodPos.x = parseInt(Math.random() * 9 + 0);
    foodPos.y = parseInt(Math.random() * 9 + 0);
  }
  x = x * size + size / 2;
  y = y * size + size / 2;
  ctx.beginPath();
  ctx.fillStyle = "purple";
  ctx.arc(x, y, size / 2 - 5, 0, 2 * Math.PI);
  ctx.fill();
};
drawFood();

// draw Snake
const drawSnake = () => {
  // re-draw board so that snake will get erased from the game in that moment
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < board.length; i++) {
    drawCell(board[i].x, board[i].y, "black", "white");
  }
  // 🔥🔥🔥 drawing score
  ctx.font = "24px sans";
  ctx.fillStyle = "black";
  ctx.fillText(`Score: ${score}`, 330, 150);
  drawFood();
  // snake will be drawn according to the snake array's current state
  for (let i = 0; i < snake.length; i++) {
    drawCell(snake[i].x, snake[i].y, "lime", "black");
  }
  moveSnake();
};
drawSnake();

// restart
const restart = () => {
  score = 0;
  console.log(snake);
  lengthOfSnake = 4;
  initSnake();
  console.log(snake);
  return;
};

// 📽️📽️📽️ animation
const animation = () => {
  drawSnake();
  window.requestAnimationFrame(animation);
};

let interval;
document.addEventListener("keydown", (e) => {
  clearInterval(interval);
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
  interval = setInterval(drawSnake, 200);
  // window.requestAnimationFrame(drawSnake);
});
