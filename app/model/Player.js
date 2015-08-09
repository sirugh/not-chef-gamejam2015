var play = require('../engine/play');
var Plate = require('../model/Plate');

var Player = function(game, name, id) {
  this.game = game;
  this.name = name;
  this.id = id;
  this.inventory = null;
  this.plate = null;
  this.completedPlates = [];
  this.score = 0;
  this.chosen = false;
}

Player.prototype.addPlate = function () {
  var sprite = this.game.add.sprite(this.game.width / 2, 0, 'plate');

  // position the plate
  sprite.y = this.game.height - sprite.height;
  if (this.id === 1) {
    sprite.x = this.game.width / 4;
  } else {
    sprite.x = (this.game.width / 4) * 3;
  }
  sprite.anchor.setTo(0.5, 0);

  // Current ingredients on the plate
  var label = this.game.add.text(-sprite.width/2 + 130, 0, '');
  sprite.addChild(label);

  var plate = new Plate(play.chooseFoods(2), sprite);
  this.plate = plate;
}

Player.prototype.populateInventory = function () {
  var self = this;
  this.inventory = _.map(play.chooseFoods(4), function(name) {
    return {
      name : name,
      sprite : function (text) {
        var sprite = self.game.add.text(0, 0, text);
        sprite.anchor.setTo(self.id - 1,.5);
        return sprite;
      }(name),
      selected : false
    }
  });
}

Player.prototype.completePlate = function () {
  this.completedPlates.push(this.plate);
  this.score += play.ratePlate(this.plate);
  this.plate.kill();
  this.plate = null;
}

Player.prototype.addIngredientToPlate = function (food) {
  this.removeFromInventory(food);
  this.plate.foodItems.unshift(food.name); // put the food on top
  this.plate.update();
}

Player.prototype.removeFromInventory = function (food) {
  food.sprite.alpha = .1;
  food.sprite.children[0].alpha = .1;
  food.selected = true;
  // var index = _(this.inventory).findIndex({name : food.name});
  // this.inventory.splice(index, 1);
}

Player.prototype.choose = function (index) {
  var food = this.inventory[index];
  if (!food.selected) {
    console.log('%s selected %s', this.name, food.name);
    this.addIngredientToPlate(food);
    this.chosen = true;
  } else {
    console.log('%s already chosen!', food.name);
  }
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

Player.prototype.reset = function () {
  this.populateInventory();
  this.addPlate();
}

module.exports = Player;


