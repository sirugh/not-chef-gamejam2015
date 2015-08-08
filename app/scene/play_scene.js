'use strict';
var pad1;
var pad2;
var imageA, imageB, imageX, imageY;
var buttonA, buttonB, buttonX, buttonY;

var foods = require('../data/foods.js');

function addButtons (pad) {
  //  We can't do this until we know that the gamepad has been connected and is started
  buttonA = pad.getButton(Phaser.Gamepad.XBOX360_A);
  buttonB = pad.getButton(Phaser.Gamepad.XBOX360_B);
  buttonX = pad.getButton(Phaser.Gamepad.XBOX360_X);
  buttonY = pad.getButton(Phaser.Gamepad.XBOX360_Y);

  buttonA.onDown.add(onDown, this);
  buttonB.onDown.add(onDown, this);
  buttonX.onDown.add(onDown, this);
  buttonY.onDown.add(onDown, this);

  buttonA.onUp.add(onUp, this);
  buttonB.onUp.add(onUp, this);
  buttonX.onUp.add(onUp, this);
  buttonY.onUp.add(onUp, this);
}

function onDown (button, value) {

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

function onUp (button, value) {
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

function testRatePlate () {
  function printScore(ingredients) {
    var score = ratePlate(ingredients);
    console.log(ingredients + ': ' + score);
  }

  printScore(['lettuce', 'tomato', 'cheese']);
  printScore(['peanut butter', 'banana']);
  printScore(['fish', 'lettuce', 'caviar']);
  printScore(['cheese', 'caviar', 'fish']);
  printScore(['gravy', 'chicken', 'fish']);
  printScore(['peanut butter', 'gravy', 'cheese', 'lettuce']);
  printScore(['chicken', 'gravy', 'lettuce']);
}

function ratePlate (ingredients) {
  // Add base point value for plate
  // Add combos

  var multiplier = 1;
  var score = 0;

  var multipliers = {};

  foods.forEach( function (combo) {
   var a = combo[0];
   var b = combo[1];
   var bonus = combo[2];

   if(bonus < 1) {
    bonus = bonus * 5;
   }

   if (ingredients.indexOf(a) !== -1 &&
       ingredients.indexOf(b) !== -1) {
    multipliers[a] = (multipliers[a] || 1) + bonus;
    multipliers[b] = (multipliers[b] || 1) + bonus;
   }
  });

  ingredients.forEach( function (ingredient) {
    score += 10 * (multipliers[ingredient] || 1);
  });

  return score;
}

window.ratePlate = ratePlate;
window.testRatePlate = testRatePlate;

var sprite, text, cursors;

var PlayScene = {
  preload : function () {
  },

  create : function () {
    var game = this.game;
    game.stage.backgroundColor = '#2d2d2d';

    //  Add some images
    imageA = game.add.image(500, 300, 'xbox360', '360_A');
    imageB = game.add.image(600, 200, 'xbox360', '360_B');
    imageX = game.add.image(400, 200, 'xbox360', '360_X');
    imageY = game.add.image(500, 100, 'xbox360', '360_Y');

    game.input.gamepad.start();

    pad1 = game.input.gamepad.pad1;
    pad2 = game.input.gamepad.pad2;

    pad1.addCallbacks(this, { onConnect: _.partial(addButtons, pad1) });
    pad2.addCallbacks(this, { onConnect: _.partial(addButtons, pad2) });
  },

  update : function () {
  }
};

module.exports = PlayScene;
