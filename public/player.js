export default class Player {
  constructor(game) {
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.width = 40;
    this.height = 40;
    this.position = {
      x: this.gameWidth / 2 - this.width / 2,
      y: this.gameHeight / 2 - this.height / 2
    };
    this.deleteMe = false;
  }

  draw(contx) {
    contx.fillStyle = "white"; //"#0ff";
    contx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  moveLeft() {
    this.position.x -= 13;
    if (this.position.x <= 0) {
      this.position.x = 0;
    }
  }

  moveUp() {
    this.position.y -= 13;
    if (this.position.y <= 0) {
      this.position.y = 0;
    }
  }

  moveRight() {
    this.position.x += 13;
    if (this.position.x + this.width >= this.gameWidth) {
      this.position.x = this.gameWidth - this.width;
    }
  }

  moveDown() {
    this.position.y += 13;
    if (this.position.y >= this.gameWidth - this.height) {
      this.position.y = this.gameWidth - this.height;
    }
  }

  update(deltaTime) {
    if (!deltaTime) return;
  }
}
