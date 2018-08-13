import CONST from 'data/const';

const Rectangle = Phaser.Geom.Rectangle;

export default class BootScene extends Phaser.Scene {

  constructor () {
    super('boot');
    this.progressBar = null;
    this.progressBgRect = null;
    this.progressRect = null;
  }

  preload () {
    this.load.spritesheet('patrick', 'patrick.png', { frameWidth: 24, frameHeight: 36, endFrame: 5 })
    this.load.image('patrick-win', 'patrick-win.png')
    this.load.image('logo', 'logo-abernathium.png')
    this.load.image('starfield', 'starfield.png')
    this.load.image('square', 'square.png')
    this.load.image('earth', 'earth.png')

    // scene text ui
    this.load.image('text-press-any-key', 'text/press-any-key.png')
    this.load.image('text-keys', 'text/keys.png')
    this.load.image('text-keys-pause', 'text/keys-pause.png')
    this.load.image('text-paused', 'text/paused.png')
    this.load.image('text-quit', 'text/quit.png')
    this.load.image('text-yes-no', 'text/yes-no.png')

    // gameplay text ui
    this.load.image('text-perfect', 'text/perfect.png')
    this.load.image('text-great', 'text/great.png')
    this.load.image('text-good', 'text/good.png')

    
    this.load.on('progress', this.onLoadProgress, this);
    this.load.on('complete', this.onLoadComplete, this);
    this.createProgressBar();
  }

  create () {
    this.registry.set('score', 0);
    this.scene.start('menu');
  }

  // extend:

  createProgressBar () {
    const main = this.cameras.main;
    this.progressBgRect = new Rectangle(0, 0, 0.5 * main.width, 50);
    Rectangle.CenterOn(this.progressBgRect, 0.5 * main.width, 0.5 * main.height);
    this.progressRect = Rectangle.Clone(this.progressBgRect);
    this.progressBar = this.add.graphics();
  }

  onLoadComplete (loader, totalComplete, totalFailed) {
    console.debug('complete', totalComplete);
    console.debug('failed', totalFailed);
    this.progressBar.destroy();
  }

  onLoadProgress (progress) {
    console.debug('progress', progress);
    this.progressRect.width = progress * this.progressBgRect.width;
    this.progressBar
      .clear()
      .fillStyle(CONST.hexColors.darkGray)
      .fillRectShape(this.progressBgRect)
      .fillStyle(this.load.totalFailed ? CONST.hexColors.red : CONST.hexColors.white)
      .fillRectShape(this.progressRect);
  }

}
