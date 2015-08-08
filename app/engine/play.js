'use strict';

var foods = require('../data/foods.js');
var Plate = require('../model/Plate.js');

module.exports = {
  testRatePlate : function () {
    function printScore(foodItems) {
      var score = ratePlate(new Plate(foodItems));
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

  ratePlate : function (plate) {
    var foodItems = plate.foodItems;
    // Add base point value for plate
    // Add combos

    var multiplier = 1;
    var score = 0;

    var multipliers = {};

    foods.combos.forEach( function (combo) {
      var a = combo[0];
      var b = combo[1];
      var bonus = combo[2];

      if (foodItems.indexOf(a) !== -1 &&
          foodItems.indexOf(b) !== -1) {

        if(bonus < 0) {
          bonus = bonus * 5;
        }

        multipliers[a] = (multipliers[a] || 1) + bonus;
        multipliers[b] = (multipliers[b] || 1) + bonus;
      }
    });

    foodItems.forEach( function (food) {
      score += 10 * (multipliers[food] || 1);
    });

    return score;
  },

  createPlayer : function () {
    var player = { };
    return player;
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
  }
}

window.ratePlate = module.exports.ratePlate;
window.testRatePlate = module.exports.testRatePlate;
window.addFood = module.exports.addFood;
