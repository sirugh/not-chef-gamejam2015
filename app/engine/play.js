'use strict';

var foods = require('../data/foods.js');
var Plate = require('../model/Plate.js');

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

  createPlate : function (sprite, count) {
    return new Plate(this.chooseIngredients(count), sprite);
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

      if (ingredients.indexOf(a) !== -1 &&
          ingredients.indexOf(b) !== -1) {

        if(bonus < 0) {
          bonus = bonus * 5;
        }

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
    return player;
  },

  chooseIngredients : function (count) {
    var possibleIngredients = foods.getIngredients();
    var ingredients = [];
    var index;
    var ingredient;

    while(ingredients.length < count) {
      index = Math.floor(Math.random() * possibleIngredients.length);
      ingredient = possibleIngredients[index];
      possibleIngredients.splice(index, 1);
      ingredients.push(ingredient);
    }

    return ingredients;
  }
}

window.ratePlate = module.exports.ratePlate;
window.testRatePlate = module.exports.testRatePlate;
window.addIngredient = module.exports.addIngredient;
