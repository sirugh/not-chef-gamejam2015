'use strict';

function makeString(foods) {
  return foods.toString();
}

var Plate = function Plate(foods, sprite) {
  this.foods = foods;
  this.sprite = sprite;
  this.sprite.setText(makeString(this.foods));
};

Plate.prototype.update = function () {
  this.sprite.setText(makeString(this.foods));
};

module.exports = Plate;
