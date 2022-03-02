const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");

const game = document.querySelector(".game");
const menu = document.querySelector(".menuSec");
let inGame = false;
let deadGreen = false;
let deadRed = false;
//Music
const menuMusic = new Audio();
menuMusic.src = "assets/SpaceTheme.mp3";

const battleMusic = new Audio();
battleMusic.src = "assets/BattleMusic.mp3";
const destroy = new Audio();
destroy.src = "assets/destroyed.mp3";
const pew = new Audio();
const redPew = new Audio();
pew.src = "assets/greenPew.mp3";
redPew.src = "assets/redPew.mp3";

function goToGame() {
  inGame = true;
  menuMusic.pause();
  game.classList.toggle("hidden");
  menu.classList.toggle("hidden");
  battleMusic.play();
  battleMusic.loop = true;
}

function playMusic() {
  menuMusic.play();
  menuMusic.loop = true;
}

let round = 0;
const speed = 3;
let points = [0, 0];
let greenPlayerPoints = points[0];
const greenPoints = document.querySelector(".greenPoints");
let redPlayerPoints = points[1];
const redPoints = document.querySelector(".redPoints");
const projectile = new Object();
let playerGreen = document.querySelector(".playerGreen");
let playerGreenDead = document.querySelector(".greenDead");
const redProjectile = new Object();
let playerRed = document.querySelector(".playerRed");
let playerRedDead = document.querySelector(".redDead");
const background = document.querySelector(".background");

//Game
let x,
  y,
  rightPressed,
  leftPressed,
  upPressed,
  downPressed,
  xR,
  yR,
  rightPressedR,
  leftPressedR,
  upPressedR,
  downPressedR,
  xB;

function init() {
  //Green
  projectile.yProj = 0;
  projectile.xProj = 0;
  x = 30;
  y = canvas.height / 2 - 20;
  rightPressed = false;
  leftPressed = false;
  upPressed = false;
  downPressed = false;
  //Red
  redProjectile.yProjR = 0;
  redProjectile.xProjR = 0;
  xR = canvas.height * 2 - 60;
  yR = canvas.height / 2 - 20;
  rightPressedR = false;
  leftPressedR = false;
  upPressedR = false;
  downPressedR = false;
  xB = 0;
}

(window.onload = drawGame()), init();

function drawGame() {
  requestAnimationFrame(drawGame);
  clearScreen();
  inputs();
  createProjectile();
  movePlayer();
  boundryCheck();
  collisionCheck();
}

function clearScreen() {
  ctx.drawImage(background, xB, 0, canvas.width, canvas.height);
  xB++;
  ctx.drawImage(background, xB - canvas.width, 0, canvas.width, canvas.height);
  if (xB - canvas.width === 0) {
    xB = 0;
  }
}

function collisionCheck() {
  //Green Projectile
  if (
    projectile.xProj > xR &&
    projectile.xProj < xR + playerRed.width &&
    projectile.yProj > yR - 5 &&
    projectile.yProj < yR + playerRed.height &&
    deadRed === false
  ) {
    greenPlayerPoints++;
    greenPoints.innerHTML = greenPlayerPoints;
    destroy.play();
    inGame = false;
    deadRed = true;
    setTimeout(() => (inGame = true), 2000);
    setTimeout(() => {
      let count = 1;
      let interval = setInterval(() => {
        if (count % 2 === 0) {
          playerRed = document.querySelector(".playerRed");
          count++;
        } else if (count >= 7) {
          playerRed = document.querySelector(".playerRed");
          clearInterval(interval);
        } else if (!(count % 2 === 0)) {
          playerRed = document.querySelector(".blinkRed");
          count++;
        }
      }, 110);
      deadRed = false;
      init();
    }, 1000);
  }

  //Red Projectile
  if (
    redProjectile.xProjR > x - 10 &&
    redProjectile.xProjR < x - 10 + playerGreen.width &&
    redProjectile.yProjR > y - 5 &&
    redProjectile.yProjR < y + 5 + playerGreen.height &&
    deadGreen === false
  ) {
    redPlayerPoints++;
    redPoints.innerHTML = redPlayerPoints;
    destroy.play();
    inGame = false;
    deadGreen = true;
    setTimeout(() => (inGame = true), 2000);
    setTimeout(() => {
      let count = 1;
      let interval = setInterval(() => {
        if (count % 2 === 0) {
          playerGreen = document.querySelector(".playerGreen");
          count++;
        } else if (count >= 7) {
          playerGreen = document.querySelector(".playerGreen");
          clearInterval(interval);
        } else if (!(count % 2 === 0)) {
          playerGreen = document.querySelector(".blinkGreen");
          count++;
        }
      }, 110);

      (deadGreen = false), init();
    }, 1000);
  }
}

function boundryCheck() {
  //Green
  if (inGame) {
    if (y < 0) {
      y += speed;
    }
    if (x < 10) {
      x += speed;
    }
    if (y > 120) {
      y -= speed;
    }
    if (x > canvas.width / 2 - 24) {
      x -= speed;
    }
    //Red
    if (yR < 0) {
      yR += speed;
    }
    if (xR < canvas.width - 24) {
      xR += speed;
    }
    if (yR > 120) {
      yR -= speed;
    }
    if (xR > canvas.width / 2) {
      xR -= speed;
    }
  }
}

function inputs() {
  //Green
  if (inGame) {
    if (downPressed) {
      y += speed;
    }
    if (upPressed) {
      y -= speed;
    }
    if (leftPressed) {
      x -= speed;
    }
    if (rightPressed) {
      x += speed;
    }
    //Red
    if (downPressedR) {
      yR += speed;
    }
    if (upPressedR) {
      yR -= speed;
    }
    if (leftPressedR) {
      xR -= speed;
    }
    if (rightPressedR) {
      xR += speed;
    }
  }
}

function movePlayer() {
  if (deadGreen) {
    setTimeout(() => {
      document
        .querySelector(".greenDead")
        .setAttribute("src", "assets/Explosion2G.png");
      setTimeout(
        () =>
          document
            .querySelector(".greenDead")
            .setAttribute("src", "assets/Explosion3G.png"),
        200
      );
    }, 300);
  }
  if (deadRed) {
    setTimeout(() => {
      document
        .querySelector(".redDead")
        .setAttribute("src", "assets/Explosion2R.png");
      setTimeout(
        () =>
          document
            .querySelector(".redDead")
            .setAttribute("src", "assets/Explosion3R.png"),
        200
      );
    }, 300);
  }
  if (!deadRed)
    document
      .querySelector(".redDead")
      .setAttribute("src", "assets/Explosion1R.png");
  if (!deadGreen)
    document
      .querySelector(".greenDead")
      .setAttribute("src", "assets/Explosion1G.png");
  ctx.drawImage(deadGreen ? playerGreenDead : playerGreen, x, y);
  ctx.drawImage(deadRed ? playerRedDead : playerRed, xR, yR);
}

function createProjectile() {
  //Green
  projectile.xProj += speed + 2;
  ctx.beginPath();
  ctx.strokeStyle = "#90EE90";
  ctx.rect(projectile.xProj, projectile.yProj, 8, 2);
  ctx.stroke();

  //Red
  redProjectile.xProjR -= speed + 2;
  ctx.beginPath();
  ctx.strokeStyle = "red";
  ctx.rect(redProjectile.xProjR, redProjectile.yProjR, 8, 2);
  ctx.stroke();
}

//Green
document.addEventListener("keypress", function (e) {
  pressed(e, true);
  if (inGame) {
    //Projectile
    //Green
    if (e.code === "Space" && projectile.xProj >= canvas.width) {
      pew.play();
      projectile.xProj = x + 12;
      projectile.yProj = y + 15;
    }

    //Red
    if (e.code === "Backslash" && redProjectile.xProjR <= 0) {
      redPew.play();
      redProjectile.xProjR = xR + 12;
      redProjectile.yProjR = yR + 15;
    }
  }
});

document.addEventListener("keyup", function (e) {
  pressed(e, false);
});

//Detect Press
function pressed(keypress, isItPressed) {
  if (inGame) {
    if (keypress.key === "w" || keypress.key === "W") {
      upPressed = isItPressed;
    }
    if (keypress.key === "a" || keypress.key === "A") {
      leftPressed = isItPressed;
    }
    if (keypress.key === "s" || keypress.key === "S") {
      downPressed = isItPressed;
    }
    if (keypress.key === "d" || keypress.key === "D") {
      rightPressed = isItPressed;
    }

    if (keypress.key === "ArrowRight") {
      rightPressedR = isItPressed;
    }
    if (keypress.key === "ArrowDown") {
      downPressedR = isItPressed;
    }
    if (keypress.key === "ArrowLeft") {
      leftPressedR = isItPressed;
    }

    if (keypress.key === "ArrowUp") {
      upPressedR = isItPressed;
    }
  }
}

//Red
document.onkeydown = function (e) {
  pressed(e, true);
};

document.onkeyup = function (e) {
  pressed(e, false);
};

function howToPlay() {
  document.querySelector(".howToPlay").classList.toggle("hidden");
  playMusic();
}
