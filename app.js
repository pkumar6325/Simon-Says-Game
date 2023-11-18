let gameseq = [];
let userseq = [];

let started = false;
let level = 0;
let highScore = 0;

let btns = ["red", "yellow", "purple", "green"];

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("game started");
        started = true;

        levelUp();
    }
});

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 150);
}

function levelUp() {
    userseq = [];

    level++;
    h2.innerText = `Level ${level}`;

    // random btn choose
    let randIdx = Math.floor(Math.random() * 3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    gameseq.push(randColor);
    console.log(gameseq);

    btnFlash(randBtn);
}

function btnPress() {
    let btn = this;
    btnFlash(btn);

    userColor = btn.getAttribute("id");
    userseq.push(userColor);

    checkAns(userseq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function checkAns(idx) {
    // let idx=level-1;

    if (gameseq[idx] === userseq[idx]) {
        if (gameseq.length == userseq.length) {
            levelUp();
        }
    } else {
        if (highScore < level) {
            highScore = level;
        }
        h2.innerHTML = `GAME OVER! <b>Your Score was ${level}.</b> <br> <b>Highest Score = ${highScore}</b> <br>Press any key to restart.`;

        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);

        reset();
    }
}

function reset() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}