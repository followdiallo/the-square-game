import Game from "./game.js";
export default gameLoop;

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

const gameWidth = 550;
const gameHeight = 550;

let game = new Game(gameWidth, gameHeight);
game.start();

let lastTime = 0;

let loop = 0;

function gameLoop(timestamp) {
  let deltaTime = timestamp - lastTime;
  lastTime = timestamp;
  ctx.clearRect(0, 0, 600, 600);

  if (loop > 80) {
    loop = 0;
    game.generateTraffic();
  }

  game.update(deltaTime);
  game.draw(ctx);

  loop++;

  requestAnimationFrame(gameLoop);
}

gameLoop();
