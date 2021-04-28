// GLOBAL DOM VARIABLES
const movementDisplay = document.getElementById("movement");
const game = document.getElementById("game");
const Scorepad = document.querySelector("#btm-right")
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

let ballRadius = 10;
let x = game.width/2;
let y = game.height-30;
let dx = 4;
let dy = -4;
let paddleHeight = 10;
let paddleWidth = 600;
let paddleX = (game.width-paddleWidth)/2;
let rightPressed = false;
let leftPressed = false;
let brickRowCount = 10;
let brickColumnCount = 5;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;
let score = 0;
let lives = 3;

let bricks = [];
for(let i=0; i<brickColumnCount; i++) {
    bricks[i] = [];
    for(var r=0; r<brickRowCount; r++) {
        bricks[i][r] = { x: 0, y: 0, status: 1 };
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
    if(e.code  == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.code == 'ArrowLeft') {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.code == 'ArrowRight') {
        rightPressed = false;
    }
    else if(e.code == 'ArrowLeft') {
        leftPressed = false;
    }
}
function mouseMoveHandler(e) {
    var relativeX = e.clientX - game.offsetLeft;
    if(relativeX > 0 && relativeX < game.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}
function collisionDetection() {
    for(let i=0; i<brickColumnCount; i++) {
        for(var r=0; r<brickRowCount; r++) {
            var b = bricks[i][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if(score == brickRowCount*brickColumnCount) {
                        alert("YOU WIN, CONGRATS!");
                        document.location.reload();
                    }
                }
            }
        }
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
function drawBricks() {
    for(let i=0; i<brickColumnCount; i++) {
        for(var r=0; r<brickRowCount; r++) {
            if(bricks[i][r].status == 1) {
                var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (i*(brickHeight+brickPadding))+brickOffsetTop;
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
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20);
}
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: "+lives, game.width-65, 20);
}

function draw() {
    ctx.clearRect(0, 0, game.width, game.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();

    if(x + dx > game.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy < ballRadius) {
        dy = -dy;
    }
    else if(y + dy > game.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else {
            lives--;
            if(!lives) {
                alert("GAME OVER");
                document.location.reload();
            }
            else {
                x = game.width/2;
                y = game.height-30;
                dx = 2;
                dy = -2;
                paddleX = (game.width-paddleWidth)/2;
            }
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
    requestAnimationFrame(draw);
}

draw();
