'use strict';

function makeString(foods) {
  return foods.join('\n');
}

function update () {
  var labelSprite = _.find(this.sprite.children, function(child) {
    return child instanceof Phaser.Text;
  });

  if (labelSprite) {
    var label = makeString(this.foods);
    labelSprite.setText(label);
    labelSprite.y = 20 - 30 * this.foods.length;
  }
}

var Plate = function Plate(foods, sprite) {
  this.foods = foods;
  this.sprite = sprite;
  update.call(this);
};

Plate.prototype.update = update;

module.exports = Plate;
