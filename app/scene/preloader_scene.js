var PreloaderScene = {
  preload: function () {
    var game = this.game;
    this.loadingBar = this.game.add.sprite(0, 240, 'preloader_bar');
    this.loadingBar.anchor.setTo(0, 0.5);
    this.load.setPreloadSprite(this.loadingBar);

    // SHITTY PROTOTYPE ASSETS AWAYYYYYYYY
    this.game.load.image('splash', 'images/splash.png')

    this.game.load.image('plate1', 'images/plate1.png');
    this.game.load.image('plate2', 'images/plate2.png');
    this.game.load.image('plate3', 'images/plate3.png');
    this.game.load.image('plate4', 'images/plate4.png');
    this.game.load.image('select', 'images/selectSquare.png')
    this.game.load.image('background', 'images/bg.png')
    this.game.load.image('plate', 'images/plate.png')
    this.game.load.image('conveyorbelt', 'images/conveyorbelt.png')

    game.load.atlas('xbox360', 'assets/controllers/xbox360.png', 'assets/controllers/xbox360.json');
  },

  create: function () {
    this.game.state.start('play');
  }
};
module.exports = PreloaderScene;
