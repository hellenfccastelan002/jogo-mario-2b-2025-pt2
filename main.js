const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const nuvem = document.querySelector(".nuvem");
const startButton = document.querySelector(".start");
const gameOverScreen = document.getElementById("game-over-screen");
const scoreElement = document.querySelector(".score span"); 

audioStart = new Audio("./sound/audio_theme.mp3");
const gameOverSound = new Audio("./sound/audio_gameover.mp3");

let gameStarted = false;
let score = 0;
let loopInterval; 

const restartGame = () => {
    window.location.reload();
}

gameOverScreen.addEventListener('click', restartGame);


const handleGameOver = (pipePosition, marioPosition) => {
    pipe.style.animation = "none";
    pipe.style.left = `${pipePosition}px`;

    mario.style.animation = "none";
    mario.style.left = `${marioPosition}px`;

    mario.src = "./imagem/game-over.png";
    mario.style.width = "75px";
    mario.style.marginLeft = "50px";

    audioStart.pause();
    gameOverSound.play();

    clearInterval(loopInterval);

    gameOverScreen.classList.remove("hidden");
    
    setTimeout(() => {
        gameOverScreen.classList.add("game-over-active");
    }, 50);

    document.removeEventListener("keydown", jump);
}


const startGame = () => {
    gameStarted = true;
    audioStart.play();

    pipe.style.animation = "pipe-animation 1.5s infinite linear";

    startButton.style.display = "none";
    mario.style.opacity = "1";
    pipe.style.opacity = "1";
    nuvem.style.opacity = "1";

    loopInterval = setInterval(loop, 10);
}


const jump = () => {
    if (!gameStarted) return; 

    mario.classList.add("jump");

    setTimeout(() => {
        mario.classList.remove("jump");
    }, 500);
}


const updateScore = () => {
    score += 1;
    scoreElement.textContent = score; 
    
    const animationSpeed = 1.5 / (1 + score / 500);
    pipe.style.animation = `pipe-animation ${animationSpeed}s infinite linear`;
}

const loop = () => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace("px", "");
    
    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        handleGameOver(pipePosition, marioPosition);
    } 
    
    else if (pipePosition < 0 && gameStarted) {
        pipe.style.left = '';
        
        updateScore(); 
    }
}

document.addEventListener("keydown", jump);
