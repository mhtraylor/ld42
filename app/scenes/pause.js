export default class PauseScene extends Phaser.Scene {
    constructor() {
        super('pause')

        this.backdrop
        this.paused
    }

    init(data) {
        console.debug('init', this.scene.key, data, this)
    }

    create() {
        this.backdrop = this.add.graphics()
        this.backdrop.fillStyle(0x00000, 0.75)
        this.backdrop.fillRect(0, 0, 432, 768)

        this.paused = this.add.sprite(216, 300, 'text-paused').setOrigin(0.5, 0).setAlpha(0.25)

        this.tweens.add({
            targets: this.paused,
            alpha: 1,
            duration: 750,
            ease: 'Power2',
            yoyo: true,
            loop: -1,
            delay: 0
        })

        this.input.keyboard.on('keydown_P', this.unpause, this)
    }

    unpause() {
        this.scene.resume('default')
        this.scene.stop()
    }
}
