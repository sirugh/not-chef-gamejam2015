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
  this.removeFromInventory(food);
  plate.foods.push(food.name);
  plate.update();
}

Player.prototype.removeFromInventory = function (food) {
  food.sprite.alpha = 0;
  var index = _(this.inventory).findIndex({name : food.name});
  this.inventory.splice(index, 1);
}

Player.prototype.choose = function (index) {
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


