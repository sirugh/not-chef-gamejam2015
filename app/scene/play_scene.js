'use strict';

var sprite, text, cursors;
var PlayScene = {

  create: function () {

    //  Enable p2 physics
    this.game.physics.startSystem(Phaser.Physics.P2JS);

    //  Make things a bit more bouncey
    this.game.physics.p2.defaultRestitution = 0.8;

    //  Add a sprite
    sprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
    sprite.anchor.setTo(0.5, 0.5);

    //  Enable if for physics. This creates a default rectangular body.
    this.game.physics.p2.enable(sprite);

    //  Modify a few body properties
    sprite.body.setZeroDamping();
    sprite.body.fixedRotation = true;

    text = this.game.add.text(20, 20, 'move with arrow keys', { fill: '#ffffff' });

    cursors = this.game.input.keyboard.createCursorKeys();

  },

  update: function () {

    sprite.body.setZeroVelocity();

    if (cursors.left.isDown)
    {
      sprite.body.moveLeft(400);
    }
    else if (cursors.right.isDown)
    {
      sprite.body.moveRight(400);
    }

    if (cursors.up.isDown)
    {
      sprite.body.moveUp(400);
    }
    else if (cursors.down.isDown)
    {
      sprite.body.moveDown(400);
    }

  }
};

module.exports = PlayScene;
