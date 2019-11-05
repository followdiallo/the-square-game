export default class InputHandler {
  constructor(game) {
    document.addEventListener("keydown", event => {
      // 37, 38, 39, 40
      // left, up, right, down
      // 32 = space
      switch (event.keyCode) {
        case 37:
          game.player.moveLeft();
          break;
        case 38:
          game.player.moveUp();
          break;
        case 39:
          game.player.moveRight();
          break;
        case 40:
          game.player.moveDown();
          break;
        case 32:
          game.restart();
          break;
      }
    });
  }
}
