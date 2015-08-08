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
var SUSPEND = false;
var MAX_PLATES = 1;

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

    players.push(play.createPlayer());
    players.push(play.createPlayer());
    window.players = players;
    window.plates = plates;

    play.populateInventory(players);

    //// Set up GUI

    //  Add a sprite
    sprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'select');
    sprite.anchor.setTo(0.5, 0.5);
    sprite.originX = this.game.world.centerX;
    sprite.originY = this.game.world.centerY;
    sprite.xDif = 0;
    sprite.yDif = 0;
    //sprite.scale = {"x":.4, "y":.4};

    var guiPlayer = players[0];

    addFood(guiPlayer.inventory[0], this.game.world.centerX, this.game.world.centerY);
    addFood(guiPlayer.inventory[1], this.game.world.centerX + GRID_SIZE, this.game.world.centerY);
    addFood(guiPlayer.inventory[2], this.game.world.centerX, this.game.world.centerY + GRID_SIZE);
    addFood(guiPlayer.inventory[3], this.game.world.centerX + GRID_SIZE, this.game.world.centerY + GRID_SIZE);

    foods[0] = [guiPlayer.inventory[0], guiPlayer.inventory[1]];
    foods[1] = [guiPlayer.inventory[2], guiPlayer.inventory[3]];

    function addFood (name, x, y) {
      var food = game.add.text(x, y, name);
      food.anchor.setTo(.5, .5);
    }

    text = this.game.add.text(20, 20, 'move with arrow keys', { fill: '#ffffff' });

    splash = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'splash');
    splash.anchor.setTo(.5, .5);

    splashtext = this.game.add.text(0, 0, "HEY!", { fill: '#ffffff', align: "center" });
    splashtext.x = splash.x;
    splashtext.y = splash.y;
    splashtext.anchor.set(.5);
    SUSPEND = true;

    cursors = this.game.input.keyboard.createCursorKeys();
    keyboard = this.game.input.keyboard;
    keyboard.onUpCallback = keyboardEventHandler;

    //// End GUI setup
  },

  update : function () {
    while(plates.length < MAX_PLATES) {
      // add plates
      plates.push(play.createPlate(4 - players.length));
      console.log(plates);
    }

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
    var foodName = foods[sprite.yDif][sprite.xDif];
    var newFood = this.game.add.text(0, this.game.world.bounds.height, foodName);
    newFood.anchor.set(.5, .5);

    var tween = this.game.add.tween(newFood, this.game, this.game.tweens);
    tween.to({
      x: 200,
      y: 0
    });
    tween.start();
    /*tween.onComplete = function(target, tween) {
      target.kill();
    }*/
  }
}

module.exports = PlayScene;
