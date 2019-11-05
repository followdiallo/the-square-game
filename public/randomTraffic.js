export default class RandomTraffic {
  constructor(game, origin, color) {
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.game = game;
    this.origin = origin;
    this.color = color;
    this.size = Math.floor(Math.random() * 100);
    this.width = this.size;
    this.height = this.size;
    this.position = {
      x: 0,
      y: 0
    };
    this.deleteMe = false;
  }

  initialize() {
    switch (this.origin) {
      case "left":
        this.position.x = 0 - this.width;
        this.position.y = Math.floor(Math.random() * this.game.gameWidth);
        break;
      case "right":
        this.position.x = this.game.gameWidth;
        this.position.y = Math.floor(Math.random() * this.game.gameWidth);
        break;
      case "up":
        this.position.x = Math.floor(Math.random() * this.game.gameHeight);
        this.position.y = 0 - this.height;
        break;
      case "down":
        this.position.x = Math.floor(Math.random() * this.game.gameHeight);
        this.position.y = this.game.gameHeight;
        break;
    }
  }

  draw(contx) {
    //contx.fillStyle = "#cc0000";
    contx.fillStyle = this.color;
    contx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update(deltaTime) {
    if (!deltaTime) return;
    switch (this.origin) {
      case "left":
        this.position.x += 10 / deltaTime;
        if (this.position.x > this.game.gameWidth) {
          this.deleteMe = true;
        }
        break;
      case "right":
        this.position.x -= 10 / deltaTime;
        if (this.position.x < 0 - this.width) {
          this.deleteMe = true;
        }
        break;
      case "up":
        this.position.y += 10 / deltaTime;
        if (this.position.y > this.game.gameHeight) {
          this.deleteMe = true;
        }
        break;
      case "down":
        this.position.y -= 10 / deltaTime;
        if (this.position.y < 0 - this.height) {
          this.deleteMe = true;
        }
        break;
    }
    // COLLISIONS
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
        if (this.game.player.width > this.width) {
          this.game.player.width += 2;
          this.game.player.height += 2;
          this.deleteMe = true;
        } else {
          this.game.player.deleteMe = true;
        }
      }
    }
  }
}
