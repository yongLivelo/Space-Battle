const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");

//Music
const menuMusic = new Audio();
menuMusic.src = "assets/TetrisTheme.mp3";

function goToGame() {
  menuMusic.stop();
}

function playMusic() {
  menuMusic.play();
}

const battleMusic = new Audio();
battleMusic.src = "assets/TetrisBattle.mp3";
const destroy = new Audio();
destroy.src = "assets/destroyed.mp3";
const pew = new Audio();
const redPew = new Audio();
pew.src = "assets/greenPew.mp3";
redPew.src = "assets/redPew.mp3";

const speed = 3;
let health = [10, 10];
let greenPlayerHealth = health[0];
let redPlayerHealth = health[0];
const projectile = new Object();
const playerGreen = document.querySelector(".playerGreen");
const redProjectile = new Object();
const playerRed = document.querySelector(".playerRed");

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
  battleMusic.play();
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
    projectile.yProj < yR + playerRed.height
  ) {
    destroy.play();
    alert("Red Hit");
    init();
  }

  //Red Projectile
  if (
    redProjectile.xProjR > x - 10 &&
    redProjectile.xProjR < x - 10 + playerGreen.width &&
    redProjectile.yProjR > y - 5 &&
    redProjectile.yProjR < y + 5 + playerGreen.height
  ) {
    destroy.play();
    alert("green Hit");
    init();
  }
}

function boundryCheck() {
  //Green
  if (y < 0) {
    y += speed;
  }
  if (x < -5) {
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

function inputs() {
  //Green
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

function movePlayer() {
  ctx.drawImage(playerGreen, x, y);
  ctx.drawImage(playerRed, xR, yR);
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
});

document.addEventListener("keyup", function (e) {
  pressed(e, false);
});

//Detect Press
function pressed(keypress, isItPressed) {
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

//Red
document.onkeydown = function (e) {
  pressed(e, true);
};

document.onkeyup = function (e) {
  pressed(e, false);
};
