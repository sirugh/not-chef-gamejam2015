'use strict';

var Player = require('./Player');
var Round = require('./Round');
var play = require('../engine/play');

var TRIALS_PER_ROUND = 4;
var ROUNDS_PER_MATCH = 1;
var matchNumber = 0;

var Match = function Match(game) {
  this.TRIALS_PER_ROUND = TRIALS_PER_ROUND;
  this.ROUNDS_PER_MATCH = ROUNDS_PER_MATCH;
  this.matchNumber = matchNumber++;
  this.game = game;
  this.active = false;
  this.players = [];
  this.rounds = []
  this.roundScores = [];
  this.winners = [];
};

Match.prototype.toString = function() {
  return "THE Match";
}

Match.prototype.nextRound = function() {
  var someoneHasAnIngredient = _.some(this.players, function(player) {
    return _.some(player.inventory, function(item) {
      return !item.selected;
    });
  });

  round = this.rounds[this.rounds.length - 1];
  round.winners.forEach(function(winner) {
    winner.roundsWon.push(round);
  });
  // Calculate by pure score.
//  var winners = play.leaders(this.players);
  // Calculate by round count.
  var winners = round.winners;

  console.log("Round " + this.rounds.length + "/" + this.ROUNDS_PER_MATCH + " completed. Winner(s): " + winners);

  console.log("Round Score: " + this.players.reduce(function(result, player) {
    return result.concat("Player " + player.id + ": " + player.roundsWon.length);
  }, []).join(', '));

  if (!someoneHasAnIngredient || this.rounds.length >= this.ROUNDS_PER_MATCH) {
    this.complete();
  } else {
    var round = this.addRound();
    round.start();
  }
}

Match.prototype.addRound = function() {
  var round = new Round(this.game, this, this.rounds.length);
  this.rounds.push(round);
  return round;
}
Match.prototype.start = function() {
  this.active = true;
  this.addRound();
  this.rounds[0].start();
}
Match.prototype.addPlayer = function(player) {
  this.players.push(player);
}
Match.prototype.complete = function() {
  this.active = false;
  console.log("GAME OVER!!");

  // Make it clear that the game is over.
  this.players.forEach(function(player) {
    player.scoreText.style.font = '140px Arial';
  })

  // Calculate by pure score:
//  this.winners = play.leaders(this.players);
  // Calculate by rounds won:
  this.winners = this.players.reduce(function(winners, player, idx, players) {
    var roundCount = player.roundsWon.length;
    var highScore = winners[0];
    if (roundCount > highScore) {
      return [roundCount, [player]];
    } else if (roundCount == highScore) {
      return [highScore, winners[1].concat(player)];
    }
    return winners;
  }, [Number.NEGATIVE_INFINITY, []])[1];

  console.log("WINNER(S): " + this.winners);
  console.log("ROLL END CREDITS");
}

module.exports = Match;
