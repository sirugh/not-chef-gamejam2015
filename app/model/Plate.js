'use strict';

function makeString(foods) {
  return foods.toString();
}

function update () {
  var labelSprite = _.find(this.sprite.children, function(child) {
    return child instanceof Phaser.Text;
  });

  if (labelSprite) {
    labelSprite.setText(makeString(this.foods));
  }
}

var Plate = function Plate(foods, sprite) {
  this.foods = foods;
  this.sprite = sprite;
  update.call(this);
};

Plate.prototype.update = update;

module.exports = Plate;
