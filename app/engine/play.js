'use strict';

var foods = require('../data/foods.js');
var Plate = require('../model/Plate.js');

module.exports = {
  testRatePlate : function () {
    function printScore(foodItems) {
      var score = new Plate(foodItems).score();
      console.log(foodItems + ': ' + score);
    }

    printScore(['lettuce', 'tomato', 'cheese']);
    printScore(['peanut butter', 'banana']);
    printScore(['fish', 'lettuce', 'caviar']);
    printScore(['cheese', 'caviar', 'fish']);
    printScore(['gravy', 'chicken', 'fish']);
    printScore(['peanut butter', 'gravy', 'cheese', 'lettuce']);
    printScore(['chicken', 'gravy', 'lettuce']);
  },

  chooseFoods : function (count) {
    var possibleFoods = foods.getFoods();
    var chosen = [];
    var index;
    var food;

    while(chosen.length < count) {
      index = Math.floor(Math.random() * possibleFoods.length);
      food = possibleFoods[index];
      possibleFoods.splice(index, 1);
      chosen.push(food);
    }

    return chosen;
  },

  isPlateComplete : function (plate) {
    return plate.foodItems.length == 4;
  },

  leaders : function(players) {
    var leaders = [];
    var score = Number.NEGATIVE_INFINITY;
    players.forEach(function(player) {
      if (player.score > score) {
        leaders = [player];
        score = player.score;
      } else if (player.score == score) {
        leaders.push(player);
      }
    });
    return leaders;
  }
}

window.testRatePlate = module.exports.testRatePlate;
