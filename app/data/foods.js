var foods = {
  combos : [
    ['lettuce', 'tomato', .7],
    ['peanut butter', 'banana', .9],
    ['chicken', 'tomato', .8],
    ['fish', 'lettuce', .6],
    ['fish', 'caviar', .7],
    ['caviar', 'cheese', .9],
    ['caviar', 'lettuce', .6],
    ['cheese', 'tomato', .8],
    ['chicken','gravy',.9],
    ['chicken','lettuce',.6],
    ['gravy','cheese',-.8],
    ['fish','chicken',-.5],
    ['peanut butter','gravy',-.4],
    ['peanut butter','caviar',-.8],
    ['peanut butter','lettuce',-.3]
  ]
}

foods.getIngredients = function () {
  var ingredients = [];

  foods.combos.forEach(function(combo) {
    ingredients.push(combo[0]);
    ingredients.push(combo[1]);
    // todo consider slicing all but the last element and adding it
    // Set.prototype.add.call(ingredients, combo.slice(0, combo.length - 1));
  });

  return _.uniq(ingredients);
};

module.exports = foods;

/*module.exports = {
banana : {
categories : ['sweet', 'ageable'],
complements : {
'peanut butter' : .57,
'strawberries' : .3,
'yogurt' : -.2
}
},
'peanut butter' : {
}
};

pizza : ['bread', 'tomato', 'cheese', 'pepperoni'],
sandwich : ['bread', 'tomato', 'lettuce']*/
