'use strict';
var play = require('../engine/play.js');
var Player = require('../model/Player');
var Match = require('../model/Match');
var dinerThoughts = require('../data/dinerThoughts');
var soundEffects = require('../soundEffects');
var globalGame = require('../game');
var player1, player2;

var plate1, plate2, plate3, plate4, selectSquare, splash, splashtext;
var keyboard;

var sprite;
var players = [];

var pauseMenu;
var PlayScene = {
  preload : function () {
  },

  create : function () {
    var game = this.game;
    globalGame.game = game;
    game.stage.backgroundColor = '#2d2d2d';

    var background = game.add.sprite(0, 0, 'background');
    var womanThought = game.add.group();
    var thoughtText = new Phaser.Text(game, 10, 10, '');
    var woman = game.add.sprite(this.game.width / 2, 90, 'woman_a');
    var table = game.add.sprite(0, 0, 'table');

    womanThought.x = -20;
    womanThought.y = -8;

    woman.addChild(womanThought);
    var bubble = womanThought.create(0, 0, 'thoughtbubble');
    womanThought.visible = false;

    var thoughtStyle = {
        wordWrap: true,
        wordWrapWidth: bubble.width - 20
    };

    thoughtText.setStyle(thoughtStyle);

    woman.anchor.set(.5, 0);
    woman.scale.set(5, 5);
    womanThought.scale.set(1/woman.scale.x, 1/woman.scale.y);
    womanThought.add(thoughtText);

    womanThought.scale.set(.14, .14);

    woman.animations.add('left', [3, 4, 5, 4]);
    woman.animations.add('right', [6, 7, 8, 7]);
    woman.animations.add('stop', [1]);

    setTimeout(animateRight, Math.random() * 20 * 1000);
    think(true);
    playSoundEffect(true);

    function playSoundEffect(skip) {
      if(!skip) {
        game.add.audio(soundEffects[Math.floor(Math.random() * soundEffects.length)]).play();
      }

      setTimeout(playSoundEffect, Math.random() * 10 * 1000 + 2000);
    }

    function think (skip) {
      if(skip) {
        thoughtText.setText(dinerThoughts[Math.floor(Math.random() * dinerThoughts.length)]);
        womanThought.visible = true;
        setTimeout(function() {
          womanThought.visible = false;
        }, 5000);
      }
      setTimeout(think, 1000 * (Math.random() * 20 + 10));
    }

    function doTween(thing, state, duration) {
      duration = duration || 3000;
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

    function animateRight () {
      var tweenRight = doTween(woman, { x: game.width / 2 + 150 })
      tweenAndAnimate(woman, 'right', tweenRight, animateLeft);
    };
    function animateLeft () {
      var tweenLeft = doTween(woman, { x: game.width / 2 - 150 });
      tweenAndAnimate(woman, 'left', tweenLeft, animateRight);
    };

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

    //background.anchor.setTo(0.5, 0.5);
    background.height = this.game.height;
    background.width = this.game.width;
    table.x = this.game.width / 2;
    table.y = 290;
    table.anchor.setTo(0.5, 0);

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
    keyboard = this.game.input.keyboard;
    keyboard.onUpCallback = keyboardEventHandler;
    //// End GUI setup
    // game starts as paused
    pauseMenu = game.add.text(game.world.centerX, game.world.centerY + 50, 'PRESS SPACE TO START', {fill : '#ffffff'});
    pauseMenu.anchor.setTo(.5,.5);
    pauseOrUnpause();
  }, //end create
};

function keyboardEventHandler(event) {
  //player logic
  var player1Choose = _.bind(player1.choose, player1);
  var player2Choose = _.bind(player2.choose, player2);

  var playerKeyMap = {
    // player 1 keys
    81: _.partial(player1Choose, 0),
    87: _.partial(player1Choose, 1),
    69: _.partial(player1Choose, 2),
    82: _.partial(player1Choose, 3),
    65: _.partial(player1Choose, 4),
    83: _.partial(player1Choose, 5),
    68: _.partial(player1Choose, 6),
    70: _.partial(player1Choose, 7),

    // player 2 keys
    85: _.partial(player2Choose, 0),
    73: _.partial(player2Choose, 1),
    79: _.partial(player2Choose, 2),
    80: _.partial(player2Choose, 3),
    74: _.partial(player2Choose, 4),
    75: _.partial(player2Choose, 5),
    76: _.partial(player2Choose, 6),
    186: _.partial(player2Choose, 7)
  }
  var chooseIngredientFunction = playerKeyMap[event.keyCode];
  if (event.keyCode === 32) {
    pauseOrUnpause();
  } else if (chooseIngredientFunction && !globalGame.game.paused) {
    // player chose ingredient
    chooseIngredientFunction();
  } else {
    console.log('unsupported key')
  }
}

function pauseOrUnpause () {
  // invert
  globalGame.game.paused = !globalGame.game.paused;

  var paused = globalGame.game.paused;

  // draw the necessary menu
  if (!paused) {
    pauseMenu.visible = false;
  } else {
    pauseMenu.visible = true;
  }
}

module.exports = PlayScene;
