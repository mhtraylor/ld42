import CONST from 'data/const'

export default class MenuScene extends Phaser.Scene {
    constructor() {
        super('menu')

        this.starfield
        this.logo
        this.blackHole
        this.patrick
        this.clone
    }

    init(data) {
        console.debug('init', this.scene.key, data, this)
    }

    create() {
        this.starfield = this.add.tileSprite(216, 384, 432, 768, 'starfield').setAlpha(0.75)
        this.logo = this.add.sprite(216, 200, 'logo').setAlpha(1).setOrigin(0.5, 0)

        this.blackHole = this.add.graphics()
        this.blackHole.fillStyle(0x00000, 1)
        this.blackHole.fillCircle(216, -200, 300)

        this.patrick = this.add.sprite(216, 500, 'patrick')
                            .setAlpha(0.5)
                            .setOrigin(0.5, 0)
                            .setScale(12)
                            .setScaleMode(Phaser.ScaleModes.LINEAR)

        this.clone = this.add.sprite(216, 500, 'patrick')
                            .setAlpha(0.5)
                            .setOrigin(0.5, 0)
                            .setScale(12)
                            .setScaleMode(Phaser.ScaleModes.LINEAR)
                            .setTint('0xAEFA4D')
                            .setBlendMode('ADD')
        
        this.keys = this.add.sprite(15, 15, 'text-keys').setOrigin(0, 0)
        this.keysPaused = this.add.sprite(15, 40, 'text-keys-pause').setOrigin(0, 0)

        this.pressAnyKey = this.add.sprite(216, 300, 'text-press-any-key').setOrigin(0.5, 0).setAlpha(0.1)

        this.tweens.add({
            targets: this.pressAnyKey,
            alpha: 1,
            duration: 750,
            ease: 'Power2',
            yoyo: true,
            loop: -1,
            delay: 0
        })

        this.input.on('pointerup', this.start, this)
        this.input.keyboard.on('keydown', this.start, this)
    }

    update() {
        this.starfield.tilePositionY -= 0.2

        this.clone.x = Math.random() < 0.5 ? 216 - (Math.floor(Math.random() * 16) + 1) : 216 + (Math.floor(Math.random() * 16) + 1)
        this.clone.y = Math.random() < 0.5 ? 500 - (Math.floor(Math.random() * 16) + 1) : 500 + (Math.floor(Math.random() * 16) + 1)
    }

    start() {
        this.scene.start('default')
    }
}
