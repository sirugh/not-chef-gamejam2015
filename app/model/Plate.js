'use strict';

var play = require('../engine/play');
var foods = require('../data/foods.js');

var Plate = function Plate(foodItems, player = null, sprite = null) {
  this.foodItems = foodItems;
  this.sprite = sprite;
  update.call(this);
};

function update () {
  var labelSprite = _.find(this.sprite.children, function(child) {
    return child instanceof Phaser.Text;
  });

  if (labelSprite) {
    var label = this.toString();
    labelSprite.setText(this.foodItems.join('\n'));
    labelSprite.y = 40 - 30 * this.foodItems.length;
  }
}

Plate.prototype.toString = function() {
  return this.foodItems.join(", ");
}

Plate.prototype.score = function () {
  var foodItems = this.foodItems;
  // Add base point value for plate
  // Add combos

  var multiplier = 1;
  var score = 0;

  var multipliers = {};

  foods.combos.forEach( function (combo) {
    var a = combo[0];
    var b = combo[1];
    var bonus = combo[2];

    if (foodItems.indexOf(a) !== -1 &&
        foodItems.indexOf(b) !== -1) {

      if(bonus < 0) {
        bonus = bonus * 5;
      }

      multipliers[a] = (multipliers[a] || 1) + bonus;
      multipliers[b] = (multipliers[b] || 1) + bonus;
    }
  });

  foodItems.forEach( function (food) {
    score += 10 * (multipliers[food] || 1);
  });

  return score;
};

Plate.prototype.kill = function kill () {
  this.sprite.kill();
};
Plate.prototype.update = update;

module.exports = Plate;
