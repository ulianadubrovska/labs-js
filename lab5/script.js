let score = 0;
let timeLeft = 0;
let timer = null;
let gameActive = false;

let settings = {
    easy: { time: 8, spread: 200, size: 70 },
    medium: { time: 4, spread: 400, size: 50 },
    hard: { time: 2, spread: 800, size: 35 }
};

function startGame() {
    let difficulty = document.getElementById("difficulty").value;
    let color = document.getElementById("color").value;

    if (!difficulty || !color) return;

    document.getElementById("menu").style.display = "none";
    document.getElementById("game").style.display = "block";

    score = 0;
    gameActive = true;

    document.getElementById("score").textContent = score;

    setupGame(difficulty, color);
}

function setupGame(diff, color) {
    let box = document.getElementById("box");

    box.style.background = color;
    box.style.width = settings[diff].size + "px";
    box.style.height = settings[diff].size + "px";

    box.onclick = () => {
        if (!gameActive) return;

        score++;
        document.getElementById("score").textContent = score;

        moveBox(settings[diff].spread);
        resetTimer(settings[diff].time);
    };

    moveBox(settings[diff].spread);
    resetTimer(settings[diff].time);
}

function moveBox(spread) {
    let box = document.getElementById("box");

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
    document.getElementById("time").textContent = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("time").textContent = timeLeft;

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

    document.getElementById("game").style.display = "none";
    document.getElementById("menu").style.display = "block";
}