var imageA, imageB, imageX, imageY;
var buttonA, buttonB, buttonX, buttonY;

var Player = function(game, pad) {
  //  Add some images
  imageA = game.add.image(500, 300, 'xbox360', '360_A');
  imageB = game.add.image(600, 200, 'xbox360', '360_B');
  imageX = game.add.image(400, 200, 'xbox360', '360_X');
  imageY = game.add.image(500, 100, 'xbox360', '360_Y');

  this.pad = pad;

  this.pad.addCallbacks(this, { onConnect: addButtons });
}

function addButtons () {
  //  We can't do this until we know that the gamepad has been connected and is started
  buttonA = this.getButton(Phaser.Gamepad.XBOX360_A);
  buttonB = this.getButton(Phaser.Gamepad.XBOX360_B);
  buttonX = this.getButton(Phaser.Gamepad.XBOX360_X);
  buttonY = this.getButton(Phaser.Gamepad.XBOX360_Y);
  buttonA.onDown.add(onDown, this);
  buttonB.onDown.add(onDown, this);
  buttonX.onDown.add(onDown, this);
  buttonY.onDown.add(onDown, this);

  buttonA.onUp.add(onUp, this);
  buttonB.onUp.add(onUp, this);
  buttonX.onUp.add(onUp, this);
  buttonY.onUp.add(onUp, this);
}

var onDown = function (button, value) {

  if (button.buttonCode === Phaser.Gamepad.XBOX360_A)
  {
      imageA.alpha = 0.5;
  }
  else if (button.buttonCode === Phaser.Gamepad.XBOX360_B)
  {
      imageB.alpha = 0.5;
  }
  else if (button.buttonCode === Phaser.Gamepad.XBOX360_X)
  {
      imageX.alpha = 0.5;
  }
  else if (button.buttonCode === Phaser.Gamepad.XBOX360_Y)
  {
      imageY.alpha = 0.5;
  }
}

var onUp = function (button, value) {
  if (button.buttonCode === Phaser.Gamepad.XBOX360_A)
  {
      imageA.alpha = 1;
  }
  else if (button.buttonCode === Phaser.Gamepad.XBOX360_B)
  {
      imageB.alpha = 1;
  }
  else if (button.buttonCode === Phaser.Gamepad.XBOX360_X)
  {
      imageX.alpha = 1;
  }
  else if (button.buttonCode === Phaser.Gamepad.XBOX360_Y)
  {
      imageY.alpha = 1;
  }
}

module.exports = Player;


