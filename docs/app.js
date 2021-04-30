// GLOBAL DOM VARIABLES
const movementDisplay = document.getElementById("movement");
const game = document.getElementById("game");
const Scorepad = document.querySelector("#btm-right")
let playerScore = 0;


const ctx = game.getContext("2d");

// ====================== SETUP FOR CANVAS RENDERING ======================= //

game.setAttribute("height", getComputedStyle(game)["height"]);
game.setAttribute("width", getComputedStyle(game)["width"]);


ctx.clearRect(0, 0, game.width, game.height);


let ballRadius = 20;
let x = game.width / 2;
let y = game.height - 30;
let dx = 3;
let dy = -2;
let paddleHeight = 10;
let paddleWidth = 100;
let paddleX = (game.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;
let brickRowCount = 12;
let brickColumnCount = 7;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;
let score = 0;
let lives = 5;


const faillure = document.querySelector("#displayFaill")

const winning = document.querySelector("#displayWin");

const btnStart = document.querySelector("#btnStart");
btnStart.innerHTML = "Start the game";
btnStart.style.backgroundColor = "yellow";
btnStart.style.color = "red";
btnStart.style.height = "30px";
btnStart.style.width = "120px";


const btnReset = document.queryCommandValue("#btnReset");
// start.style.backgroundColor = "yellow";
// start.style.color ="red";
// start.style.height = "30px";
// start.style.width= "120px";




let bricks = [];
for (let i = 0; i < brickColumnCount; i++) {
    bricks[i] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[i][r] = { x: 0, y: 0, status: 1 };
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
    if (e.code == "ArrowRight") {
        rightPressed = true;
    }
    else if (e.code == 'ArrowLeft') {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if (e.code == 'ArrowRight') {
        rightPressed = false;
    }
    else if (e.code == 'ArrowLeft') {
        leftPressed = false;
    }
}
function mouseMoveHandler(e) {
    var relativeX = e.clientX - game.offsetLeft;
    if (relativeX > 0 && relativeX < game.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}
function collisionDetection() {
    for (let i = 0; i < brickColumnCount; i++) {
        for (var r = 0; r < brickRowCount; r++) {
            var b = bricks[i][r];
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if (score == brickRowCount * brickColumnCount) {
                        //congratulation for the winner;
                        winning.innerHTML = "Yon won!"
                        toggleClass(winning, 'show');
                        gameIsActive = false;
                        // document.location.reload();
                    }
                }
            }
        }
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    //to alernate the colors
    let coloreX = (Math.floor(Math.random() * 200));
    let coloreXB = (Math.floor(Math.random() * 200));

    ctx.fillStyle = `rgb(200, ${coloreX}, ${coloreXB})`;
    
    ctx.fill();
    ctx.closePath();
}
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, game.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "rgb(251, 255, 0)";
    ctx.fill();
    ctx.closePath();
}
function drawBricks() {
    for (let i = 0; i < brickColumnCount; i++) {
        for (var r = 0; r < brickRowCount; r++) {
            if (bricks[i][r].status == 1) {
                var brickX = (r * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (i * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[i][r].x = brickX;
                bricks[i][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "rgb(26, 90, 9)";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
function drawScore() {
    const ScorePoint = document.querySelector("#btm-left");
    ScorePoint.style.backgroundColor = "yellow";
    ScorePoint.innerHTML = (score);

}
function drawLives() {
    const boxLife = document.querySelector("#movement");
    boxLife.innerHTML = ("Lives: " + lives)

}

function draw() {
    ctx.clearRect(0, 0, game.width, game.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();

    if (x + dx > game.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy < ballRadius) {
        dy = -dy;
    }
    else if (y + dy > game.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else {
            lives--;
            if (!lives) {
                //game over show display if user lost
                faillure.innerHTML = "Game Over, to try again press 'Reset' and the 'Start' button";
                toggleClass(faillure, 'show');
                // document.location.reload
                gameIsActive = false;
            }
            else {
                x = game.width / 2;
                y = game.height - 30;
                dx = 2;
                // dy = -2;
                paddleX = (game.width - paddleWidth) / 2;
            }
        }
    }

    if (rightPressed && paddleX < game.width - paddleWidth) {
        paddleX += 7;
    }
    else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    x += dx;
    y += dy;
    requestAnimationFrame(draw);
}



function myFunction() {
    location.reload();
    return false;
}



btnStart.onclick = function () {
    if (gameIsActive = false) {
        console.log(myFunction());
    }

    return draw();

}



