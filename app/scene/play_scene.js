'use strict';
var play = require('../engine/play.js');
var Player = require('../model/Player');
var Match = require('../model/Match');
var player1, player2;

var plate1, plate2, plate3, plate4, selectSquare, splash, splashtext;
var keyboard;

var sprite;
var players = [];
var foodItems = [
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

    var background = game.add.sprite(0, 0, 'background');
    var woman = game.add.sprite(this.game.width / 2, 90, 'woman_a');
    var table = game.add.sprite(0, 0, 'table');

    woman.anchor.set(.5, 0);
    woman.scale.set(5, 5);
    woman.animations.add('left', [3, 4, 5, 4]);
    woman.animations.add('right', [6, 7, 8, 7]);
    woman.animations.add('stop', [1]);

    function doTween(thing, state, duration) {
      duration = duration || 3000;
      console.log(thing);
      var tween = game.add.tween(thing).to(state, 3000, Phaser.Easing.Linear.None, true);
      return tween;
    }

    function tweenAndAnimate(sprite, animation, tween, doNext) {
      sprite.animations.play(animation, 3, true);
      tween.onComplete.addOnce(function () {
        sprite.animations.stop(animation, true);
        sprite.animations.play('stop');
        setTimeout(_.partial(doNext, animation), Math.random() * 20 * 1000);
      }, this);
    }

    window.right = function() {
      var tweenRight = doTween(woman, { x: game.width / 2 + 150 })
      tweenAndAnimate(woman, 'right', tweenRight, left);
    };
    window.left = function() {
      var tweenLeft = doTween(woman, { x: game.width / 2 - 150 });
      tweenAndAnimate(woman, 'left', tweenLeft, right);
    };

    right();

    var conveyor = game.add.sprite(0, 0, 'conveyorbelt');
    conveyor.frame = 1;
    conveyor.animations.add('move', [0, 1], 2, true);
    conveyor.animations.play('move');
    //to stop the animation, call conveyor.animations.stop();
    conveyor.anchor.setTo(0.5, 0);

    //background.anchor.setTo(0.5, 0.5);
    background.height = this.game.height;
    background.width = this.game.width;
    conveyor.y = this.game.height - conveyor.height + 3;
    conveyor.x = this.game.width / 2;
    table.x = this.game.width / 2;
    table.y = 290;

    // NEW MATCH!
    var match = new Match(game);
    window.match = match;
    player1 = new Player(game, 'Player 1', 1, getSpriteFor(0), '#ff00ff');
    player2 = new Player(game, 'Player 2', 2, getSpriteFor(1), '#00ffff');
    players = [player1, player2];
    match.addPlayer(player1);
    match.addPlayer(player2);

    // Start the match!
    match.start();

    table.anchor.setTo(0.5, 0);
    conveyor.anchor.setTo(0.5, 0);

    // add player 1

    var playerOneX = 150;
    var playerTwoX = game.width - 150;
    var playerY = game.height + 100;

    function getSpriteFor(playerNum) {
      var x = playerNum === 0 ? playerOneX : playerTwoX;
      var stopFrame = playerNum === 0 ? 7 : 4;
      var playerSprite = game.add.sprite(x, playerY, 'woman_b');

      playerSprite.anchor.set(.5, 1);
      playerSprite.scale.set(7, 7);
      //playerSprite.animations.add('left', [3, 4, 5, 4]);
      playerSprite.animations.add('stop', [stopFrame]);
      playerSprite.animations.add('up', [9, 10, 11]);
      playerSprite.animations.add('down', [0, 1, 2]);

      playerSprite.animations.play('stop');

      return playerSprite;
    }

    var p1ConveyorStart = { x: playerOneX, y : playerY };
    var p1ConveyorEnd = { x: playerOneX + 150, y : playerY - 200 };
    var p2ConveyorStart = { x: playerTwoX, y : playerY };
    var p2ConveyorEnd = { x: playerTwoX - 150, y : playerY - 200 };
    var p1ConveyorEndScale = { x: 6.5, y: 6.5};


    function chooseNext(playerNum, lastAnimation) {
      var tween, tweenOptions, animation;
      var player = playerNum === 0 ? player1 : player2;

      switch(lastAnimation) {
        case 'up':
          tweenOptions = playerNum === 0 ? p1ConveyorStart : p2ConveyorStart;
          animation = 'down';
          break;
        case 'down':
          tweenOptions = playerNum === 0 ? p1ConveyorEnd : p2ConveyorEnd;
          animation = 'up';
          break;
      }

      tween = doTween(player.sprite, tweenOptions);
      tweenAndAnimate(player.sprite, animation, tween, _.partial(chooseNext, playerNum));
    }

    chooseNext(0, 'down');
    chooseNext(1, 'down');

    //// Set up GUI
    SUSPEND = false;

    keyboard = this.game.input.keyboard;
    keyboard.onUpCallback = keyboardEventHandler;

    //// End GUI setup
    // Set up player visual inventory
    var self = this;
    var sprite;

    var labelMap = {
      0: ['Q', 'U'],
      1: ['W', 'I'],
      2: ['E', 'O'],
      3: ['R', 'P']
    }

    player1.inventory.forEach(function(food, i) {
      sprite = food.sprite;
      // create sprite
      sprite.x = 50;
      sprite.y = i * sprite.height + self.world.height/2;

      // create label
      var labelText = labelMap[i][0];
      var label = self.game.add.text(-30, -sprite.height/2, labelText, {fill : player1.color});
      sprite.addChild(label);
    });

    player2.inventory.forEach(function (food, i) {
      sprite = food.sprite;
      sprite.x = self.world.width - 50;
      sprite.y = i * sprite.height + self.world.height/2;

      // create label
      var labelText = labelMap[i][1];
      var label = self.game.add.text(10, -sprite.height/2, labelText, {fill : player2.color} );
      // label.anchor.setTo(0, 0);
      sprite.addChild(label);
    });
    _(players).each(function (player) {
      var playerScoreStyle = {fill : player.color, font: '65px Arial'};
      player.scoreText = game.add.text(0,0, '0', playerScoreStyle);
      if (player.id === 1) {
        player.scoreText.x = 250;
      } else {
        player.scoreText.x = 750;
      }
    });
  }, //end create

  update : function () {
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
