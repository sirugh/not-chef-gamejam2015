var play = require('../engine/play');
var Plate = require('../model/Plate');

var Player = function(game, name, id, sprite, color) {
  this.sprite = sprite;
  this.game = game;
  this.name = name;
  this.id = id;
  this.inventory = null;
  this.plate = null;
  this.completedPlates = [];
  this.score = 0;
  this.scoreText;
  this.chosen = false;
  this.color = color;
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
        var sprite = self.game.add.text(0, 0, text, {fill : '#ffffff'});
        sprite.anchor.setTo(self.id - 1,.5);
        return sprite;
      }(name),
      selected : false
    }
  });
}

Player.prototype.completePlate = function () {
  var game = this.game;

  this.completedPlates.push(this.plate);
  var plateScore = play.ratePlate(this.plate);
  this.score += plateScore;
  this.scoreText.setText(this.score);

  //TODO make this actually align with the player/plate
  var scoreText = game.add.text(0, 500, plateScore + 'pts!', {fill : this.color, font: "65px Arial"});
  if (this.id === 1) {
    scoreText.x = 250;
  }else {
    scoreText.x = 750;
  }
  game.add.tween(scoreText).to({y: 0}, 3000, Phaser.Easing.Linear.None, true);
  game.add.tween(scoreText).to({alpha: 0}, 3000, Phaser.Easing.Linear.None, true);
  //TODO actually delete the score text. right now this just sets alpha to 0 effectively making it invisible.

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
}

Player.prototype.reset = function () {
  this.populateInventory();
  this.addPlate();
}

module.exports = Player;


