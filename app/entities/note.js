import Phaser from 'phaser'

export default class Note extends Phaser.GameObjects.Image {

    constructor(scene, texture) {
        super(scene, -1, -1, texture)

        this.speed = 0
    }

    init(x, y, speed) {
        this.x = x
        this.y = y
        this.speed = speed

        this.setScale(2)
        this.setAlpha(0.5)

        this.scene.physics.add.existing(this)
        this.body.allowGravity = false
    }

    update() {
        this.y += this.speed
    }
}