export default class Phase extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y)
        this.scene = scene

        this.setTexture('patrick')
        this.setPosition(x, y)
        this.setScale(2)
        this.setAlpha(0.2)
        this.setOrigin(0.5, 1)
        this.setTint('0xAEFA4D')
        this.setBlendMode('ADD')

        this.startingPosition
        this.name
    }

    init(config) {
        this.name = config.name || 'phase'
        this.startingPosition = {
            x: this.x,
            y: this.y
        }

        this.scene.add.existing(this)
    }

    update() {
        this.alpha -= 0.01

        this.x = Math.random() < 0.5 ? this.startingPosition.x - (Math.floor(Math.random() * 5) + 1) : this.startingPosition.x + (Math.floor(Math.random() * 5) + 1)
        this.y = Math.random() < 0.5 ? this.startingPosition.y - (Math.floor(Math.random() * 5) + 1) : this.startingPosition.y + (Math.floor(Math.random() * 5) + 1)

        if (this.alpha === 0) {
            this.destroy()
        }
    }
}