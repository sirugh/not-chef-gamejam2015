var _ = require('underscore');

var imageA, imageB, imageX, imageY;
var buttonA, buttonB, buttonX, buttonY;

var Controller = function (game, device) {
  this.game = game;
  this.device = device;

  this.device.addCallbacks(this, { onConnect: _.bind(this.addButtons, this) });
}

Controller.prototype.addButtons = function () {
  var game = this.game;
  if (this.device.index === 0) {
    this.imageA = game.add.image(200, 300, 'xbox360', '360_A');
    this.imageB = game.add.image(300, 200, 'xbox360', '360_B');
    this.imageX = game.add.image(100, 200, 'xbox360', '360_X');
    this.imageY = game.add.image(200, 100, 'xbox360', '360_Y');
  } else {
    this.imageA = game.add.image(500, 300, 'xbox360', '360_A');
    this.imageB = game.add.image(600, 200, 'xbox360', '360_B');
    this.imageX = game.add.image(400, 200, 'xbox360', '360_X');
    this.imageY = game.add.image(500, 100, 'xbox360', '360_Y');
  }
  //  We can't do this until we know that the gamepad has been connected and is started
  this.buttonA = this.device.getButton(Phaser.Gamepad.XBOX360_A);
  this.buttonB = this.device.getButton(Phaser.Gamepad.XBOX360_B);
  this.buttonX = this.device.getButton(Phaser.Gamepad.XBOX360_X);
  this.buttonY = this.device.getButton(Phaser.Gamepad.XBOX360_Y);

  this.buttonA.onDown.add(onDown, this);
  this.buttonB.onDown.add(onDown, this);
  this.buttonX.onDown.add(onDown, this);
  this.buttonY.onDown.add(onDown, this);

  this.buttonA.onUp.add(onUp, this);
  this.buttonB.onUp.add(onUp, this);
  this.buttonX.onUp.add(onUp, this);
  this.buttonY.onUp.add(onUp, this);
}

function onDown (button, value) {

  if (button.buttonCode === Phaser.Gamepad.XBOX360_A) {
      this.imageA.alpha = 0.5;
  } else if (button.buttonCode === Phaser.Gamepad.XBOX360_B) {
      this.imageB.alpha = 0.5;
  } else if (button.buttonCode === Phaser.Gamepad.XBOX360_X) {
      this.imageX.alpha = 0.5;
  } else if (button.buttonCode === Phaser.Gamepad.XBOX360_Y) {
      this.imageY.alpha = 0.5;
  }
}

function onUp (button, value) {
  if (button.buttonCode === Phaser.Gamepad.XBOX360_A) {
      this.imageA.alpha = 1;
  } else if (button.buttonCode === Phaser.Gamepad.XBOX360_B) {
      this.imageB.alpha = 1;
  } else if (button.buttonCode === Phaser.Gamepad.XBOX360_X) {
      this.imageX.alpha = 1;
  } else if (button.buttonCode === Phaser.Gamepad.XBOX360_Y) {
      this.imageY.alpha = 1;
  }
}

module.exports = Controller;