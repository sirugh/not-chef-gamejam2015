var play = require('../engine/play');
var Player = function(game, name) {
  this.name = name;
  this.inventory = null;
  this.chosen = false;
}

Player.prototype.populateInventory = function (constructSprite) {
  this.inventory = _.map(play.chooseIngredients(4), function(name) {
    return {
      name : name,
      sprite : constructSprite(name)
    }
  });
}

Player.prototype.addIngredient = function (food, plate) {
  this.removeFromInventory(this.inventory, food);
  plate.foods.push(food.name);
  plate.update();
}

Player.prototype.removeFromInventory = function (inventory, food) {
  food.sprite.alpha = .1;
}

Player.prototype.choose = function (index) {
  // var foodIndex = getIndex(sprite.xDif, sprite.yDif);
  var food = this.inventory[index];
  this.addIngredient(food, plates[0]);
  console.log('%s selected %s', this.name, food.name);
  this.chosen = true;
     /*var tween = this.game.add.tween(newFood, this.game, this.game.tweens);
  //   tween.to({
  //     x: 200,
  //     y: 0
  //   });
  //   tween.start();*/

  //   /*tween.onComplete = function(target, tween) {
  //     target.kill();
  //   }*/
  // }
}

module.exports = Player;


