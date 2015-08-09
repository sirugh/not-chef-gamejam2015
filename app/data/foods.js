var foods = {
  combos : ([
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
    ['peanut butter','lettuce',-.3],
    ['peanut butter', 'game jam', 1.8]
  ]).map(function(combo) {
    // Make the negative combos more negative
    var bonus = combo[combo.length - 1];
    return combo.slice(0, -1).concat(bonus < 0 ? bonus * 5 : bonus);
  })
}

foods.getFoods = function () {
  var included = [];

  foods.combos.forEach(function(combo) {
    console.log(combo);
    included.push.apply(included, combo.slice(0, -1));
  });

  return _.uniq(included);
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
