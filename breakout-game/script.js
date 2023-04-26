const ruleButton = document.getElementById("rule-button");
const closeButton = document.getElementById("close-button");
const rule = document.getElementById("rule");

ruleButton.addEventListener("click", () => {
  rule.classList.add("show");
});

closeButton.addEventListener("click", () => {
  rule.classList.remove("show");
});

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const ballRadius = 10;
const brickRowCount = 5;
const brickColumnCount = 9;
const brickWidth = 70;
const brickHeight = 15;
const brickPadding = 10;
const brickOffsetTop = 50;
const brickOffsetLeft = 45;
const speed = 1;
let score = 0;
let x = canvas.width / 2;
let y = canvas.height - 150;
let dx = 4 * speed;
let dy = -4 * speed;
const paddleWidth = 100;
const paddleHeight = 10;
const paddleOffset = 10;
let paddleX = (canvas.width - paddleWidth) / 2;

let rightPressed = false;
let leftPressed = false;

const bricks = [];

function init() {
  for (let c = 0; c < brickColumnCount; c += 1) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r += 1) {
      bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
  }
  score = 0;
}

function keyDownHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = true;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = false;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = false;
  }
}

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095dd";
  ctx.fill();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(
    paddleX,
    canvas.height - (paddleHeight + paddleOffset),
    paddleWidth,
    paddleHeight,
  );
  ctx.fillStyle = "#0095dd";
  ctx.fill();
}

function drawBricks() {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      if (bricks[c][r].status === 1) {
        const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#0095dd";
        ctx.fill();
      }
    }
  }
}

function drawScore() {
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`, canvas.width - 110, 30);
}

function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      const brick = bricks[c][r];
      if (brick.status === 1) {
        if (
          x > brick.x &&
          x < brick.x + brickWidth &&
          y > brick.y &&
          y < brick.y + brickHeight
        ) {
          dy = -dy;
          brick.status = 0;
          score += 1;
          if (score === brickRowCount * brickColumnCount) {
            init();
          }
        }
      }
    }
  }
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if (y + dy < ballRadius) {
    dy = -dy;
  }
  if (
    x > paddleX &&
    x < paddleX + paddleWidth &&
    y + ballRadius > canvas.height - (paddleHeight + paddleOffset) &&
    y + ballRadius < canvas.height - paddleOffset
  ) {
    dy = -dy;
  }
  if (y + dy > canvas.height - ballRadius) {
    dy = -dy;
    init();
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  collisionDetection();

  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7 * speed;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7 * speed;
  }

  x += dx;
  y += dy;
  requestAnimationFrame(draw);
}
init();
draw();
