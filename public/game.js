import Player from "/player.js";
import InputHandler from "/input.js";
import RandomTraffic from "./randomTraffic.js";

const GAMESTATE = {
  RUNNING: 0,
  VICTORY: 1
};

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
  }

  start() {
    this.gamestate = GAMESTATE.RUNNING;
    this.player = new Player(this);
    new InputHandler(this.player);

    this.gameObjects = [this.player];

    this.generateTraffic();
    this.generateTraffic();
    this.generateTraffic();
  }

  generateTraffic() {
    const directions = ["up", "down", "left", "right"];
    const colors = ["red", "orange", "yellow", "green", "blue", "purple"];
    const newTraffic = new RandomTraffic(
      this,
      directions[Math.floor(Math.random() * 4)],
      colors[Math.floor(Math.random() * 6)]
    );
    newTraffic.initialize();
    this.gameObjects.push(newTraffic);
    console.log(this.gameObjects);
  }

  update(deltaTime) {
    if (this.player.position.y === 0) {
      this.gamestate = GAMESTATE.VICTORY;
      return;
    }
    this.gameObjects = this.gameObjects.filter(obj => obj.deleteMe !== true);
    this.gameObjects.forEach(object => object.update(deltaTime));
  }

  draw(ctx) {
    // if (this.gamestate === GAMESTATE.VICTORY) {
    //   ctx.rect(0, 0, this.gameWidth, this.gameHeight);
    //   ctx.fillStyle = "rgba(0,0,0,0.5)";
    //   ctx.fill();
    //   ctx.font = "80px Courier";
    //   ctx.fillStyle = "white";
    //   ctx.textAlign = "center";
    //   ctx.fillText("YOU WIN", this.gameWidth / 2, 60);
    //   return;
    // }
    this.gameObjects.forEach(object => object.draw(ctx));
  }
}
