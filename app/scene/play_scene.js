'use strict';
var play = require('../engine/play.js');
var Player = require('../model/Player');
var player1, player2;
var timerText;

var plate1, plate2, plate3, plate4, selectSquare, splash, splashtext;
var keyboard;

var sprite, cursors;
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

var timer = 10; //in seconds
function updateTimer () {
  if (player1.chosen && player2.chosen) {
    timer = 10; // reset it if both players have chosen!
    player1.chosen = false;
    player2.chosen = false;
  } else if (timer <= 0) {
    timer = 10; // reset if 0
  } else {
    timer -= 1;
  }
  timerText.setText(timer);
}

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

    // add player 1
    player1 = new Player(game, 'player1');

    player1.populateInventory(function (text) {
      var sprite = game.add.text(0, 0, text);
      sprite.anchor.setTo(.5, .5);
      return sprite;
    });

    // add player 2
    player2 = new Player(game, 'player2');
    player2.populateInventory(function (text) {
      var sprite = game.add.text(0, 0, text);
      sprite.anchor.setTo(.5, .5);
      return sprite;
    });

    players.push(player1);
    players.push(player2);
    window.players = players;
    window.plates = plates;

    //// Set up GUI

    //  Add a sprite
    sprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'select');
    sprite.anchor.setTo(0.5, 0.5);
    sprite.originX = this.game.world.centerX;
    sprite.originY = this.game.world.centerY;
    sprite.xDif = 0;
    sprite.yDif = 0;

    SUSPEND = false;

    cursors = this.game.input.keyboard.createCursorKeys();
    keyboard = this.game.input.keyboard;
    keyboard.onUpCallback = keyboardEventHandler;

    // once the game is started, start the timer
    var style = { font: "65px Arial", fill: "#ff0044"};
    timerText = game.add.text(5, 2, timer, style);
    game.time.events.loop(Phaser.Timer.SECOND, updateTimer);
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
  //player logic
  var player1KeyMap = {
    81: 'Q',
    87: 'W',
    69: 'E',
    82: 'R'
  }
  var player2KeyMap = {
    85: 'U',
    73: 'I',
    79: 'O',
    80: 'P'
  }
  if ( _(Object.keys(player1KeyMap)).contains(event.keyCode.toString()) ) {
    var key = player1KeyMap[event.keyCode];
    if(key === 'Q') {
      player1.choose(0);
    } else if (key === 'W') {
      player1.choose(1);
    } else if (key === 'E') {
      player1.choose(2);
    } else if (key === 'R') {
      player1.choose(3);
    }
  }

  if ( _(Object.keys(player2KeyMap)).contains(event.keyCode.toString()) ) {
    var key = player2KeyMap[event.keyCode];
    if(key === 'U') {
      player2.choose(0);
    } else if (key === 'I') {
      player2.choose(1);
    } else if (key === 'O') {
      player2.choose(2);
    } else if (key === 'P') {
      player2.choose(3);
    }
  }
}

module.exports = PlayScene;
