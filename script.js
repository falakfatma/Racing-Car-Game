let gameArea = document.getElementById('gameArea')
gameAlert.addEventListener('click', gameStart)
document.addEventListener('keyup', keyUp);
document.addEventListener('keydown', keyDown);
let player = {
  speed: 5
};

let keys = {
  ArrowUp: false,
  ArrowLeft: false,
  ArrowDown: false,
  ArrowRight: false
}

function keyDown(e) {
  e.preventDefault()
  keys[e.key] = true
  // console.log(keys)
}
function keyUp(e) {
  e.preventDefault()
  keys[e.key] = false
  // console.log(keys)
}

// console.log(gameAlert)
function moveLines() {
  let lines = document.querySelectorAll('.lines')
  lines.forEach((item)=>{
    if(item.y >= 800){
      item.y -= 850
    }
    item.y += player.speed
    item.style.top = item.y + 'px'
    
    // console.log(item.y = player.speed)
  })
}
function moveEnemyCar(){
  let enemyCar = document.querySelectorAll('.enemyCar')
  enemyCar.forEach((item)=>{
    if(item.y >= 800){
      item.y -= 850
    }
    item.y += player.speed
    item.style.top = item.y + 'px'
    
    // console.log(item.y = player.speed)
  })
}
// function isCollide(){
// let a =   a.getBoundingClientRect()
// let b =   b.getBoundingClientRect()
  
// }

function gamePlay() {
  // console.log(`you are playing`);
  let car = document.querySelector('.car')
  let road = gameArea.getBoundingClientRect()
  // console.log(road);
  // road.getBoundingClientRect()

  if (player.start) {
    moveEnemyCar()
    moveLines()
    if (keys.ArrowUp && player.y > 90) { player.y -= player.speed }
    if (keys.ArrowDown && player.y < (road.height - 140)) { player.y += player.speed }
    if (keys.ArrowLeft && player.x > 0) { player.x -= player.speed }
    if (keys.ArrowRight && player.x < (road.width - 40)) { player.x += player.speed }
    car.style.top = player.y + 'px'
    car.style.left = player.x + 'px'

    window.requestAnimationFrame(gamePlay);
  }
}
function gameStart() {
  gameArea.classList.remove('hide')
  gameAlert.classList.add('hide')

  player.start = true
  // console.log(player.start = true)
  window.requestAnimationFrame(gamePlay);

  // create car
  let car = document.createElement('div')
  car.setAttribute('class', 'car')
  // car.innerHTML = `Its your car`
  gameArea.append(car)
  player.x = car.offsetLeft;
  player.y = car.offsetTop;
// create lines
  for (i = 0; i < 5; i++) {
    let lines = document.createElement('div')
    lines.setAttribute('class', 'lines')
    lines.y = (i * 200)
    lines.style.top = lines.y + "px";
    gameArea.append(lines)
  }

  // console.log(player.x)
  // console.log(player.y)
   for (i = 0; i < 3; i++) {
    let enemyCar = document.createElement('div')
    enemyCar.setAttribute('class', 'enemyCar')
    enemyCar.y = ((i+1) *350)*-1
    enemyCar.style.top = enemyCar.y + "px";
     // let randomPos
    enemyCar.style.left = Math.floor(Math.random()*350) + "px";
    gameArea.append(enemyCar)
  }
}
// start()