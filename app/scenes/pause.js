import CONST from 'data/const';

export default class PauseScene extends Phaser.Scene {

  constructor () {
    super('pause');
  }

  init (data) {
    console.debug('init', this.scene.key, data, this);
  }

  create () {
    const sky = this.add.tileSprite(216, 384, 432, 768, 'starfield')
    sky.alpha = 0.5;
    
    this.add.text(216, 300, 'PAUSED', {
      fill: CONST.colors.white,
      fontFamily: CONST.fonts.default,
      fontSize: 48
    })
      .setOrigin(0.5)
      .setShadow(0, 1, CONST.colors.aqua, 10);

    /*
    this.add.text(216, 450, 'Last Score: ' + this.registry.get('score'), {
      fill: CONST.colors.gold,
      fontFamily: CONST.fonts.default,
      fontSize: 24
    })
      .setOrigin(0.5)
      .setShadow(0, 1, CONST.colors.black, 5);
    */
    this.input.keyboard.on('keydown_P', this.unpause, this);
    this.input.on('pointerup', this.unpause, this);
  }

  // extend:

  unpause () {
    this.scene.resume('default');
    this.scene.stop();
  }

}
