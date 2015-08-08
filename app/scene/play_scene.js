'use strict';
var pad1;

var play = require('../engine/play.js');
var Player = require('../model/Player');
var player1;

var sprite, text, cursors;
var players = [];

var PlayScene = {
  preload : function () {
  },

  create : function () {
    var game = this.game;
    game.stage.backgroundColor = '#2d2d2d';

    game.input.gamepad.start();

    // add player 1
    var pad1 = game.input.gamepad.pad1;
    player1 = new Player(game, pad1);

    players.push(play.createPlayer());
    players.push(play.createPlayer());

    play.populateInventory(players);
  },

  update : function () {
  }
};

module.exports = PlayScene;
