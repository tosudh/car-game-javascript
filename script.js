const score = document.querySelector(".score");
const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");
let lines;
let allEnemies;
let keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
};
let playerData = {
  speed: 5,
  score:0
};

startScreen.addEventListener("click", start);
document.addEventListener("keydown", pressOn);
document.addEventListener("keyup", pressOff);

function start() {
  playerData.start=true;
  lines = document.getElementsByClassName("line");
  startScreen.classList.add("hide");
  score.classList.add("hide");
  gameArea.classList.remove("hide");
  gameArea.innerHTML=''
  playerData.start = true;
  for (let i = 0; i < 5; i++) {
    const newLine = document.createElement("span");
    newLine.className = "line";
    newLine.style.top = i * 150 + "px";
    gameArea.appendChild(newLine);
  }
  let car = document.createElement("img");
  car.src = "./img/player_car.svg";
  car.classList.add("car");
  car.classList.add("player");
  gameArea.appendChild(car);
  makeEnemyCar(gameArea, 3);
  playerData.x = car.offsetLeft;
  playerData.y = car.offsetTop;
  window.requestAnimationFrame(playGame);
}
function pressOn(e) {
  e.preventDefault();
  keys[e.key] = true;
}
function pressOff(e) {
  e.preventDefault();
  keys[e.key] = false;
}

function playGame() {
  let playerCar = document.querySelector(".player");
  let road = gameArea.getBoundingClientRect();
  
  if (playerData.start) {
    
    moveRoadLines(road);
    manageEnemy(road, playerCar);
    playerData.score++;  
    if (keys["ArrowLeft"] && playerData.x > 45) {
      playerData.x -= playerData.speed;
    }
    if (keys["ArrowRight"] && playerData.x + 50 < road.width) {
      playerData.x += playerData.speed;
    }
    if (keys["ArrowUp"] && playerData.y > playerCar.height + 100) {
      playerData.y -= playerData.speed;
    }
    if (keys["ArrowDown"] && playerData.y < road.height + 80) {
      playerData.y += playerData.speed;
    }
    playerCar.style.left = playerData.x + "px";
    playerCar.style.top = playerData.y + "px";
    window.requestAnimationFrame(playGame);
  }
}
function makeEnemyCar(target, n) {
  for (var i = 0; i < n; i++) {
    let enemyCar = document.createElement("img");
    enemyCar.src = "./img/computer_car.svg";
    enemyCar.classList.add("car");
    enemyCar.style.left = Math.floor(Math.random() * 250) + 50 + "px";
    enemyCar.style.top = -850 * i + "px";
    console.log(enemyCar.style.left);
    enemyCar.classList.add("computer");
    target.appendChild(enemyCar);
  }
  allEnemies = document.querySelectorAll(".computer");
}
function manageEnemy(road, playerCar) {
  allEnemies.forEach((enemy) => {
    if (carColide(playerCar, enemy)) {
      endGame();
    }
    if (enemy.offsetTop > road.height + 500) {
      enemy.style.top = -1150 + playerData.speed + "px";
      enemy.style.left = Math.floor(Math.random() * 250) + 50 + "px";
    } else {
      enemy.style.top = enemy.offsetTop + playerData.speed + "px";
    }
  });
}
function moveRoadLines(road) {
  for (let line of lines) {
    if (line.offsetTop >= road.height) {
      line.style.top = "-20px";
    }
    line.style.top = playerData.speed + line.offsetTop + "px";
  }
}

function carColide(player, enemy) {
  let aRect = player.getBoundingClientRect();
  let bRect = enemy.getBoundingClientRect();
  return !(
    aRect.bottom < bRect.top ||
    aRect.top > bRect.bottom ||
    aRect.right < bRect.left ||
    aRect.left > bRect.right
  );
}

function endGame() {
  playerData.start = false;
  startScreen.classList.remove("hide");
  score.classList.remove("hide");
  // gameArea.classList.add("hide");
  score.innerHTML = "Game Over <br> Score was "+playerData.score
}