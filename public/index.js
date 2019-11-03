import Game from "./game.js";
export default gameLoop;

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

const gameWidth = 500;
const gameHeight = 500;

let game = new Game(gameWidth, gameHeight);
game.start();

let lastTime = 0;

function gameLoop(timestamp) {
  let deltaTime = timestamp - lastTime;
  lastTime = timestamp;
  ctx.clearRect(0, 0, 600, 600);

  game.update(deltaTime);
  game.draw(ctx);

  requestAnimationFrame(gameLoop);
}

gameLoop();
