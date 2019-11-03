import Player from "/player.js";

export default class InputHandler {
  constructor(player) {
    document.addEventListener("keydown", event => {
      // 37, 38, 39, 40
      // left, up, right, down
      switch (event.keyCode) {
        case 37:
          player.moveLeft();
          break;
        case 38:
          player.moveUp();
          break;
        case 39:
          player.moveRight();
          break;
        case 40:
          player.moveDown();
          break;
      }
    });
  }
}
