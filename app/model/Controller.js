var _ = require('underscore');

var Controller = function (game, device) {
  this.game = game;
  this.device = device;
  this.id = device.index;
  this.buttonA = null;
  this.device.addCallbacks(this, { onConnect: _.bind(this.addButtons, this) });
}

Controller.prototype.addButtons = function () {
  var game = this.game;
  if (this.device.index === 0) {
    console.log('creating device 1')
    this.imageA = game.add.image(200, 300, 'xbox360', '360_A');
  } else {
    console.log('creating device 2')
    this.imageA = game.add.image(500, 300, 'xbox360', '360_A');
  }

  this.imageA.alpha = 0;

  //  We can't do this until we know that the gamepad has been connected and is started
  console.log(this.device);
  this.buttonA = this.device.getButton(Phaser.Gamepad.XBOX360_A);
  console.log(this.buttonA.onDown.toString())
  this.buttonA.onDown.add(onDown, this);
  window.buttonA = this.buttonA
  console.log(this.buttonA.onDown.toString())
  console.log('ondown: ', onDown.toString())
  this.buttonA.onUp.add(onUp, this);
}

function onDown (button, value) {
  console.log('button down %s', button.buttonCode)
  if (button.buttonCode === Phaser.Gamepad.XBOX360_A) {
      this.imageA.alpha = 0.5;
  }
}

function onUp (button, value) {
  console.log('buttonup')
  if (button.buttonCode === Phaser.Gamepad.XBOX360_A) {
      this.imageA.alpha = 1;
  }
}

module.exports = Controller;