var _ = require('underscore');

var Controller = function (game, player, device) {
  this.game = game;
  this.device = device;
  this.buttonA = null;
  this.player = player;
  this.device.addCallbacks(this, { onConnect: _.bind(this.addButtons, this) });
}

Controller.prototype.addButtons = function () {
  var game = this.game;
<<<<<<< Updated upstream
=======
  if (this.device.index === 0) {
    console.log('creating device 1')
    this.imageA = game.add.image(200, 300, 'xbox360', '360_A');
  } else {
    console.log('creating device 2')
    this.imageA = game.add.image(500, 300, 'xbox360', '360_A');
  }
>>>>>>> Stashed changes

  //  We can't do this until we know that the gamepad has been connected and is started
  this.buttonA = this.device.getButton(Phaser.Gamepad.XBOX360_A);
  this.buttonA.onDown.add(onDown, this);
  this.buttonA.onUp.add(onUp, this);
}

function onDown (button, value) {
  if (button.buttonCode === Phaser.Gamepad.XBOX360_A) {
   this.player.choose();
  }
}

function onUp (button, value) {
  if (button.buttonCode === Phaser.Gamepad.XBOX360_A) {
    this.imageA.alpha = 1;
  }
}

module.exports = Controller;
