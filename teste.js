var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// player variables
var playerWidth = 40;
var playerHeight = 20;
var playerX = (canvas.width - playerWidth) / 2;
var playerY = canvas.height - playerHeight - 10;
var playerSpeed = 5;

// bullet variables
var bulletWidth = 2;
var bulletHeight = 10;
var bulletX = 0;
var bulletY = 0;
var bulletSpeed = 10;
var bulletFired = false;

// alien variables
var alienRowCount = 5;
var alienColumnCount = 10;
var alienWidth = 20;
var alienHeight = 20;
var alienPadding = 10;
var alienOffsetTop = 30;
var alienOffsetLeft = 30;
var aliens = [];

// keyboard variables
var leftKeyPressed = false;
var rightKeyPressed = false;
var spaceKeyPressed = false;

// add event listeners
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// initialize aliens
for (var c = 0; c < alienColumnCount; c++) {
  aliens[c] = [];
  for (var r = 0; r < alienRowCount; r++) {
    aliens[c][r] = { x: 0, y: 0, alive: true };
  }
}

// event handlers
function keyDownHandler(event) {
  if (event.keyCode === 37) {
    leftKeyPressed = true;
  } else if (event.keyCode === 39) {
    rightKeyPressed = true;
  } else if (event.keyCode === 32) {
    spaceKeyPressed = true;
  }
}

function keyUpHandler(event) {
  if (event.keyCode === 37) {
    leftKeyPressed = false;
  } else if (event.keyCode === 39) {
    rightKeyPressed = false;
  } else if (event.keyCode === 32) {
    spaceKeyPressed = false;
  }
}

// update game state
function update() {
  // move player
  if (leftKeyPressed && playerX > 0) {
    playerX -= playerSpeed;
  } else if (rightKeyPressed && playerX < canvas.width - playerWidth) {
    playerX += playerSpeed;
  }

  // fire bullet
  if (spaceKeyPressed && !bulletFired) {
    bulletFired = true;
    bulletX = playerX + playerWidth / 2;
    bulletY = playerY;
  }

  // move bullet
  if (bulletFired && bulletY > 0) {
    bulletY -= bulletSpeed;
  } else if (bulletFired && bulletY <= 0) {
    bulletFired = false;
  }

  // move aliens
  for (var c = 0; c < alienColumnCount; c++) {
    for (var r = 0; r < alienRowCount; r++) {
      var alien = aliens[c][r];
      if (alien.alive) {
