'use strict';

var Player = require('./Player');
var PlayScene = require('../scene/play_scene')

var Trial = function Trial(game, round, id) {
  this.id = id;
  this.game = game;
  this.round = round;
  this.active = false;
  this.timer = 7; //in seconds
  this.players = round.players;
  this.loop = null;
  this.winners = [];
};

Trial.prototype.toString = function() {
  return "Trial " + this.id;
}

var timerText;

function updateTimer () {
  function allChosen(players) {
    players.every(function(player) {
      return player.chosen;
    })};
  function resetChosen(players) {
    players.forEach(function(player) {
      player.chosen = false;
    });
  }
  function nextTrial(callback) {
    callback();
  }

  if (allChosen(this.players)) {
    resetChosen(this.players)
  } else if (this.timer <= 1) {
    this.complete();
  } else {
    this.timer -= 1;
  }
  if (this.active) {
    timerText.setText(this.timer);
  }
}

Trial.prototype.start = function() {
  var self = this;
  this.active = true;
  // once the game is started, start the timer
  var style = { font: "65px Arial", fill: "#ff0044"};
  timerText = this.game.add.text(5, 2, this.timer, style);
  this.loop = this.game.time.events.loop(Phaser.Timer.SECOND, _.bind(updateTimer, this, timerText));

  this.players.forEach(function(player) {
    var xFromCenter = player.plate.group.x - self.game.width / 2;
    var x = (xFromCenter * .7) + self.game.width / 2;
    self.game.add.tween(player.plate.group).to({x: x, y : self.game.height - 200}, self.timer * 1000, Phaser.Easing.Linear.None, true);
    self.game.add.tween(player.plate.group.scale).to({x: .7, y: .7}, self.timer * 1000, Phaser.Easing.Linear.None, true);
  });
}

Trial.prototype.complete = function() {
  this.active = false;
  this.plates = this.players.map(function(player) {
    player.plate;
  });

  this.winners = this.players.reduce(function(winners, player, idx, players) {
    var score = player.plate.score();
    var highScore = winners[0];
    if (score > highScore) {
      return [score, [player]];
    } else if (score == highScore) {
      return [highScore, winners[1].concat(player)];
    }
    return winners;
  }, [Number.NEGATIVE_INFINITY, []])[1];

  // Cleanup that timer loop we had.
  this.game.time.events.remove(this.loop);
  timerText.destroy();

  this.players.forEach(function(player) {
    player.completePlate();
    player.addPlate();
  });
  // Bubble up to round.
  this.round.nextTrial();
}

module.exports = Trial;
