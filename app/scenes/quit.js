export default class QuitScene extends Phaser.Scene {
    constructor() {
        super('quit')

        this.backdrop
        this.quitText
        this.yesNo
    }

    init(data) {
        console.debug('init', this.scene.key, data, this)
    }

    create() {
        this.backdrop = this.add.graphics()
        this.backdrop.fillStyle(0x00000, 0.75)
        this.backdrop.fillRect(0, 0, 432, 768)

        this.quitText = this.add.sprite(216, 300, 'text-quit').setOrigin(0.5, 0)
        this.yesNo = this.add.sprite(216, 350, 'text-yes-no').setOrigin(0.5, 0).setAlpha(0.25)

        this.tweens.add({
            targets: this.yesNo,
            alpha: 1,
            duration: 750,
            ease: 'Power2',
            yoyo: true,
            loop: -1,
            delay: 0
        })


        this.input.keyboard.on('keydown_Y', this.quit, this)
        this.input.keyboard.on('keydown_N', this.unpause, this)
    }

    unpause() {
        this.scene.resume('default')
        this.scene.stop()
    }

    quit() {
        this.scene.stop('default')
        this.scene.start('menu')
        this.scene.stop()
    }

}
