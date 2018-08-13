import CONST from 'data/const'

export default class WinScene extends Phaser.Scene {
    constructor() {
        super('win')

        this.starfield
        this.great
        this.patrick
        this.earth
        this.score
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

        this.great = this.add.sprite(216, 80, 'text-great')
                                    .setOrigin(0.5, 0)


        const settings = {
            fill: CONST.colors.white,
            fontFamily: CONST.fonts.default,
            fontSize: 20,
            fontStyle: 'bold'
        }
        this.scoreUI = this.add.text(216, 160, 
                                    this.registry.get('score'), 
                                    settings)
                                .setOrigin(0.5, 0)
                                .setShadow(0, 1, CONST.colors.black, 5)

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
