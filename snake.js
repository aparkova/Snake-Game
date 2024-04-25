//board
var blockSize = 25;
var rows = 30;
var cols = 30;
var board;
var context;

//snake head position (5, 5)
// ToDo: change the snake head position to the center of the board
var snakeX = blockSize * 7;
var snakeY = blockSize * 13;

// snake is not moving initially
var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

var foodX;
var foodY;

var gameOver = false;

var scoreValue = 0;
var highestScore = 0;

window.onload = function () {
  scoreElement = document.getElementById("score");
  scoreElement.innerHTML = "Score: " + scoreValue;

  highestScoreElement = document.getElementById("highestScore");
  highestScore = localStorage.getItem("highestScore") || 0;
  highestScoreElement.innerHTML = "Highest Score: " + highestScore;

  board = document.getElementById("board");
  board.height = rows * blockSize;
  board.width = cols * blockSize;
  context = board.getContext("2d"); //used for drawing on the board

  placeFood();
  document.addEventListener("keyup", changeDirection);
  setInterval(update, 1000 / 10); //100 milliseconds

  // To Do: get element by id 'restart' and add an event listener on click
  document.getElementById("reset").addEventListener("click",resetGame)
  scoreElement.innerHTML = "Score: " + scoreValue;

};

// set the snake to its initial state
function resetGame() {
   snakeX = blockSize * 7;
   snakeY = blockSize * 13;
  snakeBody = [];
  velocityX = 0;
  velocityY = 0;
  scoreValue = 0;
  scoreElement.innerHTML = "Score: " + scoreValue;
  gameOver = false;
}

function update() {
  if (gameOver) {
    if (scoreValue > highestScore) {
      highestScore = scoreValue;
      highestScoreElement.innerHTML = "Highest Score: " + highestScore;
      localStorage.setItem("highestScore", highestScore);
    }
    return;
  }

  context.fillStyle = "#707070";
  context.fillRect(0, 0, board.width, board.height);

  context.fillStyle = "pink"; // ToDo: change the color of the food to pink, find css color code
  context.fillRect(foodX, foodY, blockSize, blockSize);

  if (snakeX == foodX && snakeY == foodY) {
    snakeBody.push([foodX, foodY]);
    placeFood();
    scoreValue++;
    scoreElement.innerHTML = "Score: " + scoreValue;
    // console.log(scoreValue);
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }
  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }

  context.fillStyle = "#8A2BE2";
  snakeX += velocityX * blockSize;
  snakeY += velocityY * blockSize;
  context.fillRect(snakeX, snakeY, blockSize, blockSize);
  for (let i = 0; i < snakeBody.length; i++) {
    context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
  }

  //game over conditions
  if (
    snakeX < 0 ||
    snakeX > cols * blockSize ||
    snakeY < 0 ||
    snakeY > rows * blockSize
  ) {
    gameOver = true;
    alert("Game Over");
  }

  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
      gameOver = true;
      alert("Game Over");
    }
  }
}

//change Velocity to 0.5
// change keys to KeyW, KeyS, KeyA, KeyD
function changeDirection(e) {
  if (e.code == "KeyW" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.code == "KeyS" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.code == "KeyA" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.code == "KeyD" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
}

function placeFood() {
  //(0-1) * cols -> (0-19.9999) -> (0-19) * 25
  let posocc; 
  do {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
    posocc=false
    for (let i=0;i<snakeBody.length;i++){
      if(snakeBody[i][0]===foodX && snakeBody[i][1]===foodY){
        posocc=true;
        break
      }
    }
  } while (posocc)
  
}
