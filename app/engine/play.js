'use strict';

var foods = require('../data/foods.js');

module.exports = {
  testRatePlate : function () {
    function printScore(ingredients) {
      var score = ratePlate(ingredients);
      console.log(ingredients + ': ' + score);
    }

    printScore(['lettuce', 'tomato', 'cheese']);
    printScore(['peanut butter', 'banana']);
    printScore(['fish', 'lettuce', 'caviar']);
    printScore(['cheese', 'caviar', 'fish']);
    printScore(['gravy', 'chicken', 'fish']);
    printScore(['peanut butter', 'gravy', 'cheese', 'lettuce']);
    printScore(['chicken', 'gravy', 'lettuce']);
  },

  ratePlate : function (ingredients) {
    // Add base point value for plate
    // Add combos

    var multiplier = 1;
    var score = 0;

    var multipliers = {};

    foods.combos.forEach( function (combo) {
     var a = combo[0];
     var b = combo[1];
     var bonus = combo[2];

     if(bonus < 1) {
      bonus = bonus * 5;
     }

     if (ingredients.indexOf(a) !== -1 &&
         ingredients.indexOf(b) !== -1) {
      multipliers[a] = (multipliers[a] || 1) + bonus;
      multipliers[b] = (multipliers[b] || 1) + bonus;
     }
    });

    ingredients.forEach( function (ingredient) {
      score += 10 * (multipliers[ingredient] || 1);
    });

    return score;
  },

  createPlayer : function () {
    var player = { };
    this.populateInventory(player);
    return player;
  },

  populateInventory : function (player) {
    var possibleIngredients = foods.getIngredients();
    var inventory = [];
    var index;
    var ingredient;

    while(inventory.length < 5) {
      index = Math.floor(Math.random() * possibleIngredients.length);
      ingredient = possibleIngredients[index];
      possibleIngredients.splice(index, 1);
      inventory.push(ingredient);
    }

    player.inventory = inventory;
  }
}

window.ratePlate = module.exports.ratePlate;
window.testRatePlate = module.exports.testRatePlate;


