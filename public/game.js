import Player from "/player.js";
import InputHandler from "/input.js";
import RandomTraffic from "./randomTraffic.js";

const GAMESTATE = {
  RUNNING: 0,
  GAME_OVER: 1
};

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
  }

  start() {
    this.gamestate = GAMESTATE.RUNNING;
    this.player = new Player(this);
    new InputHandler(this);

    this.gameObjects = [this.player];

    this.generateTraffic();
    this.generateTraffic();
    this.generateTraffic();
  }

  restart() {
    if (this.gamestate !== GAMESTATE.GAME_OVER) {
      return;
    }
    this.player = new Player(this);

    this.gameObjects = [this.player];

    this.gamestate = GAMESTATE.RUNNING;
    this.generateTraffic();
    this.generateTraffic();
    this.generateTraffic();
  }

  generateTraffic() {
    const directions = ["up", "down", "left", "right"];
    const colors = [
      "#D0689B",
      "#B7219D",
      "#461BAB",
      "#5A1B8B",
      "#2D0D6D",
      "#E05B76"
    ];
    const newTraffic = new RandomTraffic(
      this,
      directions[Math.floor(Math.random() * 4)],
      colors[Math.floor(Math.random() * colors.length)]
    );
    newTraffic.initialize();
    this.gameObjects.push(newTraffic);
  }

  update(deltaTime) {
    if (!this.gameObjects.includes(this.player)) {
      this.gamestate = GAMESTATE.GAME_OVER;
      return;
    }
    this.gameObjects = this.gameObjects.filter(obj => obj.deleteMe !== true);
    this.gameObjects.forEach(object => object.update(deltaTime));
  }

  draw(ctx) {
    if (this.gamestate === GAMESTATE.GAME_OVER) {
      ctx.font = "80px Courier";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", this.gameWidth / 2, this.gameHeight / 2);
      ctx.font = "25px Courier";
      ctx.fillText(
        "Press Spacebar",
        this.gameWidth / 2,
        this.gameHeight / 2 + 35
      );
      return;
    }
    this.gameObjects.forEach(object => object.draw(ctx));
    ctx.font = "25px Courier";
    ctx.fillStyle = "orange";
    ctx.fillText(this.player.score, 500, 20);
  }
}
