export default class Note {
    constructor(scene, x, y) {
        this.scene = scene

        this.sprite = this.scene.physics.add.sprite(x, y, 'square', 0)
                            .setScale(2)
                            .setAlpha(0.5)
        this.sprite.originY = 0
        this.sprite.body.allowGravity = false
    }

    init() {
        
    }

    update() {
        if (this.sprite.y > 768) {
            this.sprite.y = 300
        }

        this.sprite.y += 2
    }
}