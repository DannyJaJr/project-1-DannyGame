// GLOBAL DOM VARIABLES
const movementDisplay = document.getElementById("movement");
const game = document.getElementById("game");
let playerScore = 0;


const ctx = game.getContext("2d");

// ====================== SETUP FOR CANVAS RENDERING ======================= //

game.setAttribute("height", getComputedStyle(game)["height"]);
game.setAttribute("width", getComputedStyle(game)["width"]);

// ctx.fillStyle = "white";
// ctx.strokeStyle = "red";
// ctx.lineWidth = 5;
// ctx.fillRect(10, 10, 100, 100);
// ctx.strokeRect(10, 10, 100, 100);



// function clearCanvas() {
//   ctx.clearRect(0, 0, game.width, game.height);
  
// }
let ballRadius = 15;
let x = game.width/2;
let y = game.height-30;
let dx = 3;
let dy = -3;
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (game.width-paddleWidth)/2;
let rightPressed = false;
let leftPressed = false;
let brickRowCount = 5;
let brickColumnCount = 12;
let brickWidth = 76;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;
let score = 2;

let bricks = [];
for(let i=0; i<brickColumnCount; i++) {
    bricks[i] = [];
    for(let r=0; r<brickRowCount; r++) {
        // bricks[i][r] = { x: 0, y: 0 };'
        //let create "status to check if colision of th bricks"
      bricks[i][r] = { x: 0, y: 0, status: 1 };
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, game.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

//a function to run the score 
function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: "+score, 8, 20);
}

function drawBricks() {
    for(let i=0; i<brickColumnCount; i++) {
        for(let r=0; r<brickRowCount; r++) {
          // let's check all bricks with the "status"  before creation 
          if(bricks[i][r].status == 1) {
            var brickX = (i*(brickWidth+brickPadding))+brickOffsetLeft;
            var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
            bricks[i][r].x = brickX;
            bricks[i][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
          }
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, game.width, game.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    collisionDetection();
    
    if(x + dx > game.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy < ballRadius) {
        dy = -dy;
    }
    else if(y + dy > game.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
           if(y= y-paddleHeight){
            dy = -dy  ;
			 }
        }
        else {
            // alert("GAME OVER");
            document.location.reload();
            clearInterval(interval); // Needed for Chrome to end game
        }
    }
    
    if(rightPressed && paddleX < game.width-paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
    
    x += dx;
    y += dy;
}

var interval = setInterval(draw, 10)



function collisionDetection() {
  for(var c=0; c<brickColumnCount; c++) {
      for(var r=0; r<brickRowCount; r++) {
          var b = bricks[c][r];
          if(b.status == 1) {
              if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                  dy = -dy;
                  b.status = 0;
                  //to update score
                  if(score == brickRowCount*brickColumnCount) {
                    alert("YOU WIN, CONGRATULATIONS!");
                    document.location.reload();
                    clearInterval(interval); // Needed for Chrome to end game
                }
              }
          }
      }
  }
}