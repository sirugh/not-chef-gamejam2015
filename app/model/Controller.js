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
