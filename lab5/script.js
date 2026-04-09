let score = 0;
let timeLeft = 0;
let timer = null;
let gameActive = false;

const difficultySelect = document.getElementById("difficulty");
const colorSelect = document.getElementById("color");
const menu = document.getElementById("menu");
const game = document.getElementById("game");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");
const box = document.getElementById("box");

let settings = {
    easy: { time: 8, size: 70 },
    medium: { time: 4, size: 50 },
    hard: { time: 2, size: 35 }
};

function startGame() {
    let difficulty = difficultySelect.value;
    let color = colorSelect.value;

    if (!difficulty || !color) return;

    menu.style.display = "none";
    game.style.display = "block";

    score = 0;
    gameActive = true;

    scoreDisplay.textContent = score;

    setupGame(difficulty, color);
}

function setupGame(diff, color) {
    box.style.background = color;
    box.style.width = settings[diff].size + "px";
    box.style.height = settings[diff].size + "px";

    box.onclick = () => {
        if (!gameActive) return;

        score++;
        scoreDisplay.textContent = score;

        moveBox();
        resetTimer(settings[diff].time);
    };

    moveBox();
    resetTimer(settings[diff].time);
}

function moveBox() {
    let boxWidth = box.offsetWidth;
    let boxHeight = box.offsetHeight;

    let maxX = window.innerWidth - boxWidth;
    let maxY = window.innerHeight - boxHeight;

    let x = Math.random() * maxX;
    let y = Math.random() * maxY;

    box.style.left = x + "px";
    box.style.top = y + "px";
}

function resetTimer(time) {
    clearInterval(timer);
    timeLeft = time;
    timeDisplay.textContent = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            gameOver();
        }
    }, 1000);
}

function gameOver() {
    clearInterval(timer);
    gameActive = false;

    alert("Game Over! Your score: " + score);
}

function restartGame() {
    clearInterval(timer);

    game.style.display = "none";
    menu.style.display = "block";
}
