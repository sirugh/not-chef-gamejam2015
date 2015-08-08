var PreloaderScene = {
  preload: function () {
    var game = this.game;
    this.loadingBar = this.game.add.sprite(0, 240, 'preloader_bar');
    this.loadingBar.anchor.setTo(0, 0.5);
    this.load.setPreloadSprite(this.loadingBar);

    // TODO: load here the assets for the game
    game.load.atlas('xbox360', 'assets/controllers/xbox360.png', 'assets/controllers/xbox360.json');
  },

  create: function () {
    this.game.state.start('play');
  }
};
module.exports = PreloaderScene;