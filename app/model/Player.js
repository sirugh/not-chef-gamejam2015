var play = require('../engine/play');
var Player = function(game, controller, name) {

  this.name = name;
  this.controller = controller;
  this.inventory = null;
  this.choice = undefined;
}

Player.prototype.populateInventory = function (constructSprite) {
  this.inventory = _.map(play.chooseIngredients(5), function(name) {
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

module.exports = Player;


