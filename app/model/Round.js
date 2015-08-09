'use strict';

var Trial = require('./Trial');
var Match = require('./Match');
var play = require('../engine/play');

var Round = function Round(game, match, id) {
  this.id = id;
  this.game = game;
  this.match = match;
  this.active = false;
  this.players = match.players;
  this.trials = [];
  this.winners = [];
  this.addTrial();
};

Round.prototype.toString = function() {
  return "Round " + this.id;
}

function getTrialWinner (trial) {
  var leaders = [];
  var highScore = Number.NEGATIVE_INFINITY;
  trial.plates.forEach(function(player, plate) {
    score = plate.score();
    if (score > highScore) {
      leaders = [player];
      highScore = score;
    } else if (score == highScore) {
      leaders.push(player);
    }
  });
  return leaders;
}
Round.prototype.nextTrial = function() {
  trial = this.trials[this.trials.length - 1];
  trial.winners.forEach(function(winner) {
    winner.trialsWon.push(trial);
  });

  // Report standings.
  console.log("Trial " + this.trials.length + "/" + this.match.TRIALS_PER_ROUND + " complete. Winner(s): " + trial.winners);

  if (this.trials.length >= this.match.TRIALS_PER_ROUND) {
    console.log("Final Trial Score: " + this.players.reduce(function(result, player) {
      return result.concat("Player " + player.id + ": " + player.trialsWon.length);
    }, []).join(', '));
    this.complete();
  } else {
    var trial = this.addTrial();
    trial.start();
  }
}

Round.prototype.addTrial = function() {
  var trial = new Trial(this.game, this, this.trials.length);
  this.trials.push(trial);
  return trial;
}

Round.prototype.start = function() {
  this.players.forEach(function(player) {
    player.populateInventory();
  })
  this.active = true;
  this.trials[0].start();
}

Round.prototype.complete = function() {
  this.active = false;

  this.winners = this.players.reduce(function(winners, player) {
    var trialCount = player.trialsWon.length;
    var highScore = winners[0];
    if (trialCount > highScore) {
      return [trialCount, [player]];
    } else if (trialCount == highScore) {
      return [highScore, winners[1].concat(player)];
    }
    return winners;
  }, [Number.NEGATIVE_INFINITY, []])[1];
  console.log("Trial winner is " + this.winners);
  // Bubble up to match.
  this.match.nextRound();
}

module.exports = Round;
