export default class Traffic2 {
  constructor(game, posx) {
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.game = game;
    this.width = 80;
    this.height = 80;
    this.position = {
      x: posx,
      y: 150
    };
  }

  draw(contx) {
    contx.fillStyle = "#ffff00";
    contx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update(deltaTime) {
    if (!deltaTime) return;
    this.position.x -= 5 / deltaTime;
    if (this.position.x <= 0 - this.width) {
      this.position.x = this.gameWidth + this.width;
    }
    let trafficTop = this.position.y;
    let trafficBottom = this.position.y + this.height;
    let trafficLeft = this.position.x;
    let trafficRight = this.position.x + this.width;
    if (
      this.game.player.position.y <= trafficBottom &&
      this.game.player.position.y + this.game.player.height >= trafficTop
    ) {
      if (
        (this.game.player.position.x <= trafficRight &&
          this.game.player.position.x >= trafficLeft) ||
        (this.game.player.position.x + this.game.player.width <= trafficRight &&
          this.game.player.position.x + this.game.player.width >= trafficLeft)
      ) {
        this.game.player.position = {
          x: this.gameWidth / 2 - this.game.player.width / 2,
          y: this.gameHeight - this.game.player.height
        };
      }
    }
  }
}
