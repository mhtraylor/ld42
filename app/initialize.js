import BootScene from 'scenes/boot';
import DefaultScene from 'scenes/default';
import MenuScene from 'scenes/menu';
import PauseScene from 'scenes/pause';
import QuitScene from 'scenes/quit';
import WinScene from 'scenes/win';

window.game = new Phaser.Game({
  // See <https://github.com/photonstorm/phaser/blob/master/src/boot/Config.js>
  width: 432,
  height: 768,
  // zoom: 1,
  // resolution: 1,
  type: Phaser.AUTO,
  // parent: null,
  // canvas: null,
  // canvasStyle: null,
  // seed: null,
  title: '☕️ Brunch with Phaser and ES6', // 'My Phaser 3 Game'
  url: 'https://github.com/samme/brunch-phaser-es6',
  version: '0.0.1',
  // input: {
  //   keyboard: true,
  //   mouse: true,
  //   touch: true,
  //   gamepad: false
  // },
  // disableContextMenu: false,
  // banner: false
  banner: {
    // hidePhaser: false,
    // text: 'white',
    background: ['#e54661', '#ffa644', '#998a2f', '#2c594f', '#002d40']
  },
  // fps: {
  //   min: 10,
  //   target: 60,
  //   forceSetTimeout: false,
  // },
  antialias: false,
  pixelArt: true,
  // transparent: false,
  // clearBeforeRender: true,
  // backgroundColor: 0x000000, // black
  loader: {
    // baseURL: '',
    path: 'assets/',
    // maxParallelDownloads: 32,
    // crossOrigin: 'anonymous',
    // timeout: 0
  },
  physics: {
    default: 'arcade',
    arcade: {
        debug: true,
      gravity: {
        y: 180
      }
    }
  },
  scene: [
    BootScene,
    DefaultScene,
    MenuScene,
    PauseScene,
    QuitScene,
    WinScene
  ],

});
