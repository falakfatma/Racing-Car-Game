let gameArea = document.getElementById('gameArea')
let score = document.getElementById('score')

gameAlert.addEventListener('click', gameStart)
document.addEventListener('keyup', keyUp);
document.addEventListener('keydown', keyDown);
let player = {
  speed: 5,
  Score: 0
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
}
function keyUp(e) {
  e.preventDefault()
  keys[e.key] = false
}
function isCollide(a, b) {
  let aRect = a.getBoundingClientRect()
  let bRect = b.getBoundingClientRect()
  return !((aRect.bottom < bRect.top) || (bRect.bottom < aRect.top) || (aRect.right < bRect.left) || (bRect.right < aRect.left))

}
function moveLines() {
  let lines = document.querySelectorAll('.lines')
  lines.forEach((item) => {
    if (item.y >= 800) {
      item.y -= 850
    }
    item.y += player.speed
    item.style.top = item.y + 'px'

  })
}
function endGame(){
  player.start = false
  gameAlert.classList.remove('hide')
  gameAlert.innerHTML = `Your Game Is Over <br> Your Score : ${player.Score} <br> Press To Restart`
}
function moveEnemyCar(car) {
  let enemyCar = document.querySelectorAll('.enemyCar')
  enemyCar.forEach((item) => {
    if (isCollide(car, item)) {
    endGame()
    }
    if (item.y >= 800) {

      item.y -= 850
      item.style.left = Math.floor(Math.random() * 350) + "px";
    }
    item.y += player.speed
    item.style.top = item.y + 'px'

  })
}


function gamePlay() {
  let car = document.querySelector('.car')
  let road = gameArea.getBoundingClientRect()

  if (player.start) {
    moveEnemyCar(car)
    moveLines()
    if (keys.ArrowUp && player.y > 90) { player.y -= player.speed }
    if (keys.ArrowDown && player.y < (road.height - 140)) { player.y += player.speed }
    if (keys.ArrowLeft && player.x > 0) { player.x -= player.speed }
    if (keys.ArrowRight && player.x < (road.width - 40)) { player.x += player.speed }
    car.style.top = player.y + 'px'
    car.style.left = player.x + 'px'

    window.requestAnimationFrame(gamePlay);
    // console.log(player.Score++)
    score.innerText = `Score : ${player.Score++} `
  }
}
function gameStart() {
  // gameArea.classList.remove('hide')
  gameArea.innerHTML = ""
  score.classList.remove('hide')
  gameAlert.classList.add('hide')

  player.start = true
  player.Score = 0
  window.requestAnimationFrame(gamePlay);

  // create car
  let car = document.createElement('div')
  car.setAttribute('class', 'car')
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
  for (i = 0; i < 3; i++) {
    let enemyCar = document.createElement('div')
    enemyCar.setAttribute('class', 'enemyCar')
    enemyCar.y = ((i + 1) * 350) * -1
    // enemyCar.style.backgroundColor = 'blue'
    enemyCar.style.top = enemyCar.y + "px";
    enemyCar.style.left = Math.floor(Math.random() * 350) + "px";
    gameArea.append(enemyCar)
  }
}
