const frames = document.querySelectorAll(".frame");
const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");
const indicators = document.getElementById("indicators");

let current = 0;

// dots
frames.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.onclick = () => show(i);
    indicators.appendChild(dot);
});

const dots = document.querySelectorAll(".indicators span");

function show(i) {
    frames[current].classList.remove("active");
    dots[current].classList.remove("active");

    current = (i + frames.length) % frames.length;

    frames[current].classList.add("active");
    dots[current].classList.add("active");
}

rightBtn.onclick = () => show(current + 1);
leftBtn.onclick = () => show(current - 1);

setInterval(() => {
    show(current + 1);
}, 3000);

dots[0].classList.add("active");

// burger
const menuBtn = document.getElementById("menuBtn");
const navList = document.getElementById("navList");

menuBtn.onclick = () => {
    navList.classList.toggle("active");
};