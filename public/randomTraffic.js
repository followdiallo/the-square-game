export default class RandomTraffic {
  constructor(game, origin, color) {
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.game = game;
    this.origin = origin;
    this.color = color;
    this.size = Math.floor(Math.random() * 100) + 5;
    this.speed = Math.floor(Math.random() * 2);
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
    contx.globalAlpha = 0.85;
    contx.fillStyle = this.color;
    contx.fillRect(this.position.x, this.position.y, this.width, this.height);
    contx.globalAlpha = 1;
  }

  update(deltaTime) {
    if (!deltaTime) return;
    switch (this.origin) {
      case "left":
        this.position.x += 10 / deltaTime + this.speed;
        if (this.position.x > this.game.gameWidth) {
          this.deleteMe = true;
        }
        break;
      case "right":
        this.position.x -= 10 / deltaTime + this.speed;
        if (this.position.x < 0 - this.width) {
          this.deleteMe = true;
        }
        break;
      case "up":
        this.position.y += 10 / deltaTime + this.speed;
        if (this.position.y > this.game.gameHeight) {
          this.deleteMe = true;
        }
        break;
      case "down":
        this.position.y -= 10 / deltaTime + this.speed;
        if (this.position.y < 0 - this.height) {
          this.deleteMe = true;
        }
        break;
    }
    // COLLISIONS
    let trafficTop = this.position.y;
    let trafficBottom = trafficTop + this.height;
    let trafficLeft = this.position.x;
    let trafficRight = trafficLeft + this.width;
    let playerTop = this.game.player.position.y;
    let playerBottom = playerTop + this.game.player.height;
    let playerLeft = this.game.player.position.x;
    let playerRight = playerLeft + this.game.player.width;

    if (
      (playerTop <= trafficBottom && playerTop >= trafficTop) ||
      (playerBottom <= trafficBottom && playerBottom >= trafficTop) ||
      (trafficTop <= playerBottom && trafficTop >= playerTop) ||
      (trafficBottom <= playerBottom && trafficBottom >= playerTop)
    ) {
      if (
        (playerLeft <= trafficRight && playerLeft >= trafficLeft) ||
        (playerRight <= trafficRight && playerRight >= trafficLeft) ||
        (trafficLeft >= playerLeft && trafficLeft <= playerRight) ||
        (trafficRight >= playerLeft && trafficRight <= playerRight)
      ) {
        if (this.game.player.width > this.width) {
          this.game.player.width += 2;
          this.game.player.height += 2;
          this.game.player.position.x -= 1;
          this.game.player.position.y -= 1;
          this.game.player.score += Math.ceil(this.size / 5) * 5;
          this.deleteMe = true;
        } else {
          this.game.player.deleteMe = true;
        }
      }
    }
  }
}
