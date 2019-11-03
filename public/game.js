import Player from "/player.js";
import InputHandler from "/input.js";
import Traffic from "./traffic.js";
import Traffic2 from "./traffic2.js";

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
  }

  start() {
    this.player = new Player(this);
    new InputHandler(this.player);

    this.obstacle1 = new Traffic(this, 10);
    this.obstacle2 = new Traffic(this, 110);
    this.obstacle3 = new Traffic(this, 210);
    this.obstacle4 = new Traffic(this, 310);
    this.obstacle5 = new Traffic(this, 410);
    this.obstacle6 = new Traffic2(this, 0);
    this.obstacle7 = new Traffic2(this, 200);
    this.obstacle8 = new Traffic2(this, 400);
    // this.obstacle9 = new Traffic2(this, 170);

    this.gameObjects = [
      this.player,
      this.obstacle1,
      this.obstacle2,
      this.obstacle3,
      this.obstacle4,
      this.obstacle5,
      this.obstacle6,
      this.obstacle7,
      this.obstacle8
      //   this.obstacle9
    ];
  }

  update(deltaTime) {
    this.gameObjects.forEach(object => object.update(deltaTime));
  }

  draw(ctx) {
    this.gameObjects.forEach(object => object.draw(ctx));
  }
}
