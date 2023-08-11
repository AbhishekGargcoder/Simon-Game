let gameSeq = [];
let userSeq = [];
let btns = ["btn-1", "btn-2", "btn-3", "btn-4"]; // // insert class of that btns to get random btn classes 
let started = false;
let level = 0;
let highestScore = 0;
const gameOverAudio= new Audio("gameOver.wav");
const clickAudio = new Audio("btnPress.wav");
const btnFlashAudio = new Audio("btnFlash.wav");
// initial set up
document.addEventListener("keypress", (event) => {
    if (started == false) {
        started = true;
        console.log("game started");
        levelUp();
    }
})
let h2 = document.querySelector("h2");

const btnFlash = (btn, color) => {
    btn.classList.add(color);
    setTimeout(() => {
        btn.classList.remove(color)
    }, 100);
}
const levelUp = () => {
    btnFlashAudio.play();
    userSeq = []; // reset userSeq -- user starts guessing from beginning 
    level++;     // upgrade to next level
    h2.innerText = `Level ${level}`;
    let randIdx = Math.floor(Math.random() * 4); // random btn class idx generated
    let randBtn = document.querySelector(`.${btns[randIdx]}`); // random btn class generated
    btnFlash(randBtn, "flash"); // random btn flashed
    gameSeq.push(btns[randIdx]);
    console.log("gameSeq ", gameSeq);
}
function isMatch(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length)// else continue checking
            setTimeout(() => {      // delay from level-n to level-n+1
                levelUp();
            }, 1000);
    }
    else {
        gameOverAudio.play();
        h2.innerHTML = `Game over! Your Score : ${level} <br>  Press any key to start`;
        document.querySelector("body").classList.add("gameOverFlash");
        setTimeout(()=>{
            document.querySelector("body").classList.remove("gameOverFlash");
        },150);
        if(level>=highestScore){
            highestScore = level;
            let span = document.querySelector("span");
            span.innerHTML = `Highest Score : ${highestScore}`;
        }
        reset();
    }
}
function btnPress() {
    clickAudio.play();
    let userBtn = this;
    btnFlash(userBtn, "userFlash");
    userBtnId = this.getAttribute("id");
    userSeq.push(userBtnId); // userBtnId == userBtn class
    console.log("userSeq ", userSeq);
    isMatch(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}
const reset = () => {
    gameSeq = [];
    started = false;
    // userSeq = []; -> it gets empty when levelUp()
    level = 0;
}