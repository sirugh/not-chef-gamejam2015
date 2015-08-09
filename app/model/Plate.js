'use strict';

var play = require('../engine/play');
var foods = require('../data/foods.js');

var Plate = function Plate(foodItems, player = null, group = null) {
  this.foodItems = foodItems;
  this.group = group;
  update.call(this);
};

function update () {
  var self = this;

  // this destroys every time
  var results = _.filter(this.group.children, function(child) {
    return !(child instanceof Phaser.Text) &&
      child.key !== 'plate';
  });

  results.forEach(function(result) {
    self.group.removeChild(result);
    // todo destroy child
  });

  var offset = -50;
  addFoodItem('breadbottom');
  this.foodItems.forEach(addFoodItem);
  addFoodItem('breadtop');

  function addFoodItem(foodItem) {
    var item = self.group.create(0, 0, foodItem);
    item.anchor.set(0.5, 0);
    item.scale.set(.4, .4);
    offset += item.height;
    item.y = -offset;
  }
}

Plate.prototype.kill = function kill () {
  // todo does this work? we don't actually know...
  this.group.destroy(true);
};

Plate.prototype.score = function () {
  var foodItems = this.foodItems;
  // Add base point value for plate
  // Add combos

  var score = 0;

  var multipliers = {};

  foods.combos.forEach( function (combo) {
    var a = combo[0];
    var b = combo[1];
    var bonus = combo[2];

    if (foodItems.indexOf(a) !== -1 &&
      foodItems.indexOf(b) !== -1) {

      multipliers[a] = (multipliers[a] || 1) + bonus;
      multipliers[b] = (multipliers[b] || 1) + bonus;
    }
  });

  foodItems.forEach( function (food) {
    score += 10 * (multipliers[food] || 1);
  });

  return score;
};

Plate.prototype.update = update;

module.exports = Plate;
