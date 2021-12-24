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
};

startScreen.addEventListener("click", start);
document.addEventListener("keydown", pressOn);
document.addEventListener("keyup", pressOff);
start();

function start() {
  console.log("click");
  lines = document.getElementsByClassName("line");
  startScreen.classList.add("hide");
  gameArea.classList.remove("hide");
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
  makeEnemyCar(gameArea,3);
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

  moveRoadLines(road);
  manageEnemy(road)
  

  if (playerData.start) {
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
function makeEnemyCar(target,n){
  for (var i = 0; i <n;i++){
    let enemyCar = document.createElement('img');
    enemyCar.src = "./img/computer_car.svg";
    enemyCar.classList.add("car");
    enemyCar.style.left = Math.floor(Math.random()*250)+50 +"px";
    enemyCar.style.top = -850*i +"px";
    console.log(enemyCar.style.left)
    enemyCar.classList.add("computer");
    target.appendChild(enemyCar) ;
  }
  allEnemies = document.querySelectorAll('.computer')
}
function manageEnemy(road){
  allEnemies.forEach((enemy)=>{
    if(enemy.offsetTop>road.height+500){
      enemy.style.top =-1150+playerData.speed+"px"
      console.log(enemy.style.top)
      enemy.style.left = Math.floor(Math.random()*250)+50 +"px";
    }
    else{
      enemy.style.top = enemy.offsetTop+playerData.speed+"px"

    }

  }) 

}
function moveRoadLines(road){
  for (let line of lines) {
    if (line.offsetTop >= road.height) {
      line.style.top='-20px';
    }
    line.style.top =playerData.speed+line.offsetTop + "px";
  }
}