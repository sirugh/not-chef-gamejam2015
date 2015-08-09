var gameWrapper = require('../game');

var PreloaderScene = {
  preload: function () {
    var game = this.game;
    gameWrapper.game = this.game;
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
    this.game.load.image('table', 'images/table.png')
    this.game.load.spritesheet('woman_a', 'images/woman_a.png', 48, 64);
    this.game.load.spritesheet('woman_b', 'images/woman_b.png', 48, 64);
    this.game.load.spritesheet('man', 'images/man.png', 70, 70);

    this.game.load.spritesheet('conveyorbelt', 'images/conveyor_spritesheet.png', 651, 210);

    this.game.load.image('banana', 'images/banana.png');
    this.game.load.image('fish', 'images/fish.png');
    this.game.load.image('chicken', 'images/chicken.png');
    this.game.load.image('cheese', 'images/cheese.png');
    this.game.load.image('caviar', 'images/caviar.png');
    this.game.load.image('peanut butter', 'images/peanutbutter.png');
    this.game.load.image('lettuce', 'images/lettuce.png');
    this.game.load.image('gravy', 'images/gravy.png');
    this.game.load.image('tomato', 'images/tomato.png');
    this.game.load.image('breadbottom', 'images/breadbottom.png');
    this.game.load.image('breadtop', 'images/breadtop.png');

    game.load.atlas('xbox360', 'assets/controllers/xbox360.png', 'assets/controllers/xbox360.json');
  },

  create: function () {
    this.game.state.start('play');
  }
};
module.exports = PreloaderScene;
