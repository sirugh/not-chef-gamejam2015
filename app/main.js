'use strict';

// CSS
require('./main.css');

// globals
global.PIXI = require('pixi.js'); //.js, not just pixi
global.p2 = require('p2');
global.Phaser = require('phaser');

// load scenes
var PlayScene = require('./scene/play_scene.js');
var BootScene = require('./scene/boot_scene.js');
var PreloaderScene = require('./scene/preloader_scene.js');

// once we load, start running the things.
window.onload = function () {
  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

  game.state.add('boot', BootScene);
  game.state.add('preloader', PreloaderScene);
  game.state.add('play', PlayScene);

  game.state.start('boot');
};
