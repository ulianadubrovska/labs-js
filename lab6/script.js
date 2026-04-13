const SIZE = 5;
let grid = [];
let startGrid = [];
let moves = 0;
let seconds = 0;
let timerId;

let lastLevel = -1;

const game = document.getElementById("game");

// запуск гри
async function loadGame() {

    const response = await fetch("data.json");
    const data = await response.json();

    let level = Math.floor(Math.random() * data.length);

    // щоб не було однакових рівнів підряд
    if (level === lastLevel) {
        level = (level + 1) % data.length;
    }

    lastLevel = level;

    grid = JSON.parse(JSON.stringify(data[level].grid));
    startGrid = JSON.parse(JSON.stringify(grid));

    document.getElementById("target").textContent = data[level].target;

    moves = 0;
    seconds = 0;

    clearInterval(timerId);
    timerId = setInterval(function () {
        seconds++;
        document.getElementById("time").textContent = seconds;
    }, 1000);

    drawField();
}

function drawField() {

    game.innerHTML = "";

    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {

            let cell = document.createElement("div");
            cell.classList.add("cell");

            if (grid[i][j] === 1) {
                cell.classList.add("on");
            } else {
                cell.classList.add("off");
            }

            cell.onclick = function () {
                handleClick(i, j);
            };

            game.appendChild(cell);
        }
    }

    document.getElementById("moves").textContent = moves;
}

function changeCell(i, j) {

    if (i < 0 || i >= SIZE || j < 0 || j >= SIZE) {
        return;
    }

    if (grid[i][j] === 1) {
        grid[i][j] = 0;
    } else {
        grid[i][j] = 1;
    }
}

function handleClick(i, j) {

    changeCell(i, j);
    changeCell(i - 1, j);
    changeCell(i + 1, j);
    changeCell(i, j - 1);
    changeCell(i, j + 1);

    moves++;

    drawField();
    checkWin();
}

function checkWin() {

    let win = true;

    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
            if (grid[i][j] === 1) {
                win = false;
            }
        }
    }

    if (win) {
        clearInterval(timerId);
        alert("Перемога!");
    }
}

document.getElementById("newGame").onclick = function () {
    loadGame();
};

document.getElementById("restart").onclick = function () {
    grid = JSON.parse(JSON.stringify(startGrid));
    moves = 0;
    seconds = 0;
    drawField();
};

loadGame();