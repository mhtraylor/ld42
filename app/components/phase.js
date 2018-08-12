export default class Phase {
    constructor(scene, position, player) {
        this.scene = scene

        // Create phase sprite
        this.sprite = scene.physics.add.sprite(position.x, position.y, 'patrick', 0)
                            .setScale(2)
                            .setTint('0xAEFA4D')
                            .setAlpha(0.25)
                            .setBlendMode('ADD')
    }

    created() {
        const sprite = this.sprite

        if (player.x > position.x) {
            sprite.setVelocity(-75, 0, 0)
        } else if (player.x < position.x) {
            sprite.setVelocity(75, 0, 0)
        }
    }

    update() {
        const x = this.sprite.x
        const y = this.sprite.y

        this.sprite.alpha -= 0.005

        if (x < 0 || x > 432 || y < 0 || y > 800) this.destroy()
    }

    destroy() {
        this.sprite.destroy()
    }
}