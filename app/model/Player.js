var play = require('../engine/play');
var Plate = require('./Plate');

// todo remove this.game this in favor of an imported game module

var Player = function(game, name, id, sprite, color) {
  this.sprite = sprite;
  this.game = game;
  this.name = name;
  this.id = id;
  this.inventory = null;
  this.plate = null;
  this.completedPlates = [];
  this.score = 0;
  this.chosen = false;
  this.trialsWon = [];
  this.roundsWon = [];
  this.color = color;
}

Player.prototype.toString = function() {
  return "Player " + this.id;
}

Player.prototype.addPlate = function () {
  var group = this.game.add.group();
  group.x = this.game.width / 2;
  group.y = 0;

  var sprite = group.create(0, 0, 'plate');

  // position the plate
  group.y = this.game.height - sprite.height;
  if (this.id === 1) {
    group.x = this.game.width / 4 + 105;
  } else {
    group.x = (this.game.width / 4) * 3 - 105;
  }
  sprite.anchor.setTo(0.5, 0);

  // Current ingredients on the plate
  var label = new Phaser.Text(this.game, -sprite.width/2 + 130, 0, '');
  group.add(label);

  var plate = new Plate(play.chooseFoods(2), this, group);
  this.plate = plate;
}

Player.prototype.populateInventory = function () {
  if (this.inventory) {
    this.inventory.forEach(function(food) {
      food.sprite.destroy();
    });
  }
  var self = this;
  var numIngredients = 8; // cause we have 10 and we apply 2 to the plate
  this.inventory = _.map(play.chooseFoods(numIngredients), function(name) {
    return {
      name : name,
      sprite : function (text) {
        var sprite = self.game.add.text(0, 0, text, {fill : '#ffffff'});
        // sprite.width = 200;
        // sprite.height = 50;
        sprite.anchor.setTo(self.id - 1,.5);
        return sprite;
      }(name),
      selected : false
    }
  });
  this.graphics();
}

Player.prototype.completePlate = function () {
  var game = this.game;
  this.completedPlates.push(this.plate);
  var plateScore = this.plate.score();
  this.score += plateScore;
  this.scoreText.setText(this.score.toFixed(0));

  //TODO make this actually align with the player/plate
  var scoreText = game.add.text(0, 500, plateScore.toFixed(0) + 'pts!', {fill : this.color, font: "65px Arial"});
  if (this.id === 1) {
    scoreText.x = 250;
  }else {
    scoreText.x = 750;
  }
  var tween = game.add.tween(scoreText).to({y: 0, alpha: 0}, 3000, Phaser.Easing.Linear.None, true);
  tween.onComplete.addOnce(_.bind(function () {game.tweens.remove(tween);}, tween, this.game));
  //TODO actually delete the score text. right now this just sets alpha to 0 effectively making it invisible.

  this.plate.kill();
  this.plate = null;
}

Player.prototype.addFoodToPlate = function (food) {
  food.selected = true;
  if (this.inventory.indexOf(food) != -1) {
    this.removeFromInventory(food);
    this.plate.foodItems.unshift(food.name); // put the food on top
    this.plate.update();
  }
}

Player.prototype.removeFromInventory = function (food) {
  food.sprite.alpha = .1;
  food.sprite.children[0].alpha = .1;
}

Player.prototype.choose = function (index) {
  var food = this.inventory[index];
  if (!food.selected) {
    console.log('%s selected %s', this.name, food.name);
    this.addFoodToPlate(food);
    this.chosen = true;
  } else {
    console.log('%s already chosen!', food.name);
  }
}

Player.prototype.reset = function () {
  // Probably better to just create a new player with the same name?
  this.populateInventory();
}

Player.prototype.graphics = function() {
  var labelMap = {
    0: ['Q', 'U'],
    1: ['W', 'I'],
    2: ['E', 'O'],
    3: ['R', 'P'],
    4: ['A', 'J'],
    5: ['S', 'K'],
    6: ['D', 'L'],
    7: ['F', ';']
  }

  var spriteX;
  var labelText;
  var labelX;
  if (this.id == 1) {
    // Player 1
    var spriteX = 50;
    var labelTextIdx = 0;
    var labelX = -30;
    var scoreTextX = 250;
  } else {
    // Player 2
    var spriteX = this.game.world.width - 50;
    var labelTextIdx = 1;
    var labelX = 10;
    var scoreTextX = 750;
  }
  // Set up player visual inventory
  var sprite;
  self = this;

  this.inventory.forEach(function(food, i) {
    sprite = food.sprite;
    // create sprite
    sprite.x = spriteX;
    sprite.y = i * sprite.height + 150;

    // create label
    var labelText = labelMap[i][labelTextIdx]
    var label = self.game.add.text(labelX, -sprite.height/2, labelText, {fill : self.color});
    sprite.addChild(label);
  });


  if (!this.scoreText) {
    var playerScoreStyle = {fill : this.color, font: '65px Arial'};
    this.scoreText = this.game.add.text(scoreTextX, '0', this.score, playerScoreStyle);
  }
}

module.exports = Player;


