export default class InputHandler {
  constructor(game) {
    document.addEventListener("keydown", event => {
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
