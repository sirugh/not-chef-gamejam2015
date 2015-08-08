'use strict';
var pad1;

var play = require('../engine/play.js');
var Player = require('../model/Player');
var Controller = require('../model/Controller');
var player1, player2;

var plate1, plate2, plate3, plate4, selectSquare, splash, splashtext;
var keyboard;

var sprite, text, cursors;
var players = [];
var plates = [];
var foods = [
  ["plate1", "plate2"],
  ["plate3", "plate4"]
];

//constants
var GRID_SIZE = 200;
var GRID_COLS = 2;
var SUSPEND = false;
var MAX_PLATES = 1;

function getCoords(game, i) {
  var col = i % GRID_COLS;
  var row = Math.floor(i / GRID_COLS);
  var x = game.world.centerX + (col * GRID_SIZE);
  var y = game.world.centerY + (row * GRID_SIZE);
  return [x, y];
}

function getIndex(x, y) {
  return y * GRID_COLS + x;
}

var PlayScene = {
  preload : function () {
  },

  create : function () {
    var game = this.game;
    game.stage.backgroundColor = '#2d2d2d';

    game.input.gamepad.start();

    // add player 1
    var pad1 = game.input.gamepad.pad1;
    player1 = new Player(game, new Controller(game, pad1), 'player1');

    //add player 2
    var pad2 = game.input.gamepad.pad2;
    player2 = new Player(game, new Controller(game, pad2), 'player2');

    players.push(player1);
    players.push(player2);
    window.players = players;
    window.plates = plates;

    player1.populateInventory(function (text) {
     var sprite = game.add.text(0, 0, text);
      sprite.anchor.setTo(.5, .5);
      return sprite;
    });

    //// Set up GUI

    //  Add a sprite
    sprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'select');
    sprite.anchor.setTo(0.5, 0.5);
    sprite.originX = this.game.world.centerX;
    sprite.originY = this.game.world.centerY;
    sprite.xDif = 0;
    sprite.yDif = 0;
    //sprite.scale = {"x":.4, "y":.4};

    text = this.game.add.text(20, 20, 'move with arrow keys', { fill: '#ffffff' });

    /*splash = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'splash');
    splash.anchor.setTo(.5, .5);

    splashtext = this.game.add.text(0, 0, "HEY!", { fill: '#ffffff', align: "center" });
    splashtext.x = splash.x;
    splashtext.y = splash.y;
    splashtext.anchor.set(.5);*/
    SUSPEND = false;

    cursors = this.game.input.keyboard.createCursorKeys();
    keyboard = this.game.input.keyboard;
    keyboard.onUpCallback = keyboardEventHandler;

    //// End GUI setup
  },

  update : function () {
    var game = this.game;

    while(plates.length < MAX_PLATES) {
      // add plates
      plates.push(play.createPlate(this.game.add.text(200, 200, ''), 4 - players.length));
      console.log(plates);
    }

    // Wrap this in some conditional
    players[0].inventory.forEach(function(food, i) {
      var coords = getCoords(game, i);
      food.sprite.x = coords[0];
      food.sprite.y = coords[1];
    });

    // TODO: Put something here.
    if(SUSPEND) {
      //remove usual keyboard listeners
      keyboard.onUpCallback = unsuspendHandler;
    }
  }
};

function unsuspendHandler(event) {
  // set SUSPEND to false
  SUSPEND = false;
  // restore usual handlers
  keyboard.onUpCallback = keyboardEventHandler;
  splash.kill();
  splashtext.kill();
}

function keyboardEventHandler(event) {
  if(event.keyIdentifier === "Left" && sprite.xDif > 0) {
    // move, but not out of the selectable area
    sprite.x -= GRID_SIZE;
    sprite.xDif--;
  }
  if(event.keyIdentifier === "Right" && sprite.xDif < foods[0].length-1) {
    sprite.x += GRID_SIZE;
    sprite.xDif++;
  }
  if(event.keyIdentifier === "Down" && sprite.yDif < foods.length-1) {
    sprite.y += GRID_SIZE;
    sprite.yDif++;
  }
  if(event.keyIdentifier === "Up" && sprite.yDif > 0) {
    sprite.y -= GRID_SIZE;
    sprite.yDif--;
  }
  if(event.keyIdentifier === "Enter") {
    //create a food and send it off into the distance
    var foodIndex = getIndex(sprite.xDif, sprite.yDif);
    var food = players[0].inventory[foodIndex];

    players[0].addIngredient(food, plates[0]);

    /*var tween = this.game.add.tween(newFood, this.game, this.game.tweens);
    tween.to({
      x: 200,
      y: 0
    });
    tween.start();*/

    /*tween.onComplete = function(target, tween) {
      target.kill();
    }*/
  }
}

module.exports = PlayScene;
