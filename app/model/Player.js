var play = require('../engine/play');
var Plate = require('../model/Plate');

var Player = function(game, name, id) {
  this.game = game;
  this.name = name;
  this.id = id;
  this.inventory = null;
  this.plate = null;
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

  var plate = new Plate(play.chooseIngredients(2), sprite);
  this.plate = plate;
}

Player.prototype.populateInventory = function () {
  var self = this;
  this.inventory = _.map(play.chooseIngredients(4), function(name) {
    return {
      name : name,
      sprite : function (text) {
        var sprite = self.game.add.text(0, 0, text);
        sprite.anchor.setTo(self.id - 1,.5);
        return sprite;
      }(name)
    }
  });
}

Player.prototype.addIngredient = function (food) {
  this.removeFromInventory(food);
  this.plate.foods.push(food.name);
  this.plate.update();
}

Player.prototype.removeFromInventory = function (food) {
  food.sprite.alpha = 0;
  var index = _(this.inventory).findIndex({name : food.name});
  this.inventory.splice(index, 1);
}

Player.prototype.choose = function (index) {
  var food = this.inventory[index];
  this.addIngredient(food);
  console.log('%s selected %s', this.name, food.name);
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


