'use strict';
var pad1;

var play = require('../engine/play.js');
var Player = require('../model/Player');
var Controller = require('../model/Controller');
var player1, player2;

var sprite, text, cursors;
var players = [];
var plates = [];
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
  },

  update : function () {
    while(plates.length < MAX_PLATES) {
      // add plates
      plates.push(play.createPlate(4 - players.length));
      console.log(plates);
    }
  }
};

module.exports = PlayScene;
