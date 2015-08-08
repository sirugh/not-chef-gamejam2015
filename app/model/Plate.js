'use strict';

function makeString(foodItems) {
  return foodItems.join('\n');
}

function update () {
  var labelSprite = _.find(this.sprite.children, function(child) {
    return child instanceof Phaser.Text;
  });

  if (labelSprite) {
    var label = makeString(this.foodItems);
    labelSprite.setText(label);
    labelSprite.y = 40 - 30 * this.foodItems.length;
  }
}

var Plate = function Plate(foodItems, sprite) {
  this.foodItems = foodItems;
  this.sprite = sprite;
  update.call(this);
};

Plate.prototype.kill = function kill () {
  this.sprite.kill();
};
Plate.prototype.update = update;

module.exports = Plate;
