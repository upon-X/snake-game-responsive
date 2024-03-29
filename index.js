const playBoard = document.querySelector(".play_board")
const scoreElement = document.querySelector(".score")
const highScoreElement = document.querySelector(".high_score")
// const Swal = require('sweetalert2')

let gameOver = false
let foodX, foodY;
let snakeX = 5, snakeY = 10;
let snakeBody = [];
let velocityX = 0, velocityY = 0;
let setIntervalId;
let score = 0
let highScore = localStorage.getItem("high_score") || 0
highScoreElement.innerHTML = `High Score : ${highScore}`

const foodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    // console.log(foodX)
    foodY = Math.floor(Math.random() * 30) + 1;
    // console.log(foodY)
};

const changeDirection = (direction) => {
    if (direction.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0
        velocityY = -1
    } else if (direction.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0
        velocityY = 1
    } else if (direction.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1
        velocityY = 0
    } else if (direction.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1
        velocityY = 0
    }
};
const changeDirectionViaBtns = (direction) => {
    if (direction === "ArrowUp" && velocityY != 1) {
        velocityX = 0
        velocityY = -1
    } else if (direction === "ArrowDown" && velocityY != -1) {
        velocityX = 0
        velocityY = 1
    } else if (direction === "ArrowLeft" && velocityX != 1) {
        velocityX = -1
        velocityY = 0
    } else if (direction === "ArrowRight" && velocityX != -1) {
        velocityX = 1
        velocityY = 0
    }
};

const handleGameOver = () => {
    clearInterval(setIntervalId)
    alertGameOver()
    // Swal.fire({
    //     title: 'Game Over!',
    //     text: `You lost, your score was ${score}`,
    //     icon: 'inform',
    //     confirmButtonText: 'Try Again'
    // })
}

const initGame = () => {
    if (gameOver) return handleGameOver()
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY}/${foodX} "></div>`;

    if (snakeX === foodX && snakeY === foodY) {
        foodPosition()
        snakeBody.push([foodX, foodY])
        score++
        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high_score", highScore)
        scoreElement.innerHTML = `Score : ${score}`
        highScoreElement.innerHTML = `High Score : ${highScore}`
    };

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1]
    }

    snakeBody[0] = [snakeX, snakeY]
    snakeX += velocityX;
    snakeY += velocityY;

    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        gameOver = true
    }

    for (let i = 0; i < snakeBody.length; i++) {
        htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]} "></div>`;
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true
        }
    }
    playBoard.innerHTML = htmlMarkup;
}
foodPosition()
setIntervalId = setInterval(initGame, 125)
document.addEventListener("keydown", changeDirection)
document.addEventListener("keydown", changeDirectionViaBtns)