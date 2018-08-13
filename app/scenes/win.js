export default class WinScene extends Phaser.Scene {
    constructor() {
        super('win')

        this.starfield
        this.congratulations
        this.patrick
        this.earth
    }

    init(data) {
        console.debug('init', this.scene.key, data, this)
    }

    create() {
        this.starfield = this.add.tileSprite(216, 384, 432, 768, 'starfield').setAlpha(0.75)

        this.patrick = this.add.sprite(216, 600, 'patrick-win')
                            .setAlpha(0)
                            .setOrigin(0.5, 0)
                            .setScale(10)
                            .setScaleMode(Phaser.ScaleModes.LINEAR)

        this.tweens.add({
            targets: this.patrick,
            y: 200,
            alpha: 0.5,
            scaleX: 24,
            scaleY: 24,
            duration: 10000,
            ease: 'Power2',
        })

        this.earth = this.add.sprite(216, 600, 'earth')
                            .setOrigin(0.5, 0)
                            .setScale(20)
                            .setScaleMode(Phaser.ScaleModes.LINEAR)

        this.input.keyboard.on('keydown', this.end, this)
    }

    update() {
        this.starfield.tilePositionY -= 0.2
    }

    end() {
        this.scene.start('menu')
    }
}
