import Phase from './phase'

export default class Player {
    constructor(scene, x, y) {
        this.scene = scene

        // Create the animations we need from the player spritesheet
        const anims = scene.anims
        anims.create({
            key: 'run',
            frames: anims.generateFrameNumbers('patrick', { start: 0, end: 5 }),
            frameRate: 8,
            repeat: -1
        })

        this.sprite = this.scene.physics.add.sprite(x, y, 'patrick', 0)
                            .setScale(2)
                            .setOrigin(0.5, 1)
        this.sprite.body.allowGravity = false
        this.sprite.body.debugBodyColor = 0xFFFF00
        this.sprite.body.setSize(1,1)
        this.sprite.body.setOffset(this.sprite.width / 2, this.sprite.height / 2)
        

        // Player inputs
        this.scene.input.keyboard.on('keydown_A', this.move, this)
        this.scene.input.keyboard.on('keydown_S', this.move, this)
        this.scene.input.keyboard.on('keydown_D', this.move, this)
        this.scene.input.keyboard.on('keydown_F', this.move, this)
    }

    move(key) {
        const playerPosition = {
            x: this.sprite.x,
            y: this.sprite.y
        }
      
        switch (key.code) {
            case 'KeyA':
                this.sprite.x = this.scene.tracks[0]
                this.scene.scoreController.addScore('good')
                break

            case 'KeyS':
                this.sprite.x = this.scene.tracks[1]
                this.scene.scoreController.addScore('great')
                break

            case 'KeyD':
                this.sprite.x = this.scene.tracks[2]
                this.scene.scoreController.addScore('perfect')
                break

            case 'KeyF':
                this.sprite.x = this.scene.tracks[3]
                break
        }

        // Create phases
        for (var i = 0; i < 2; i ++) {
            let config = {
                x: playerPosition.x,
                y: playerPosition.y,
                name: 'phase_' + i
            }

            // Generate a new phase
            let phase = new Phase(this.scene, config.x, config.y)
            phase.init(config)

            // Apply it to the phases array
            this.scene.phases.add(phase)
        }
    }

    init() {
        this.sprite.anims.play('run', true)
    }

    update() { }

    destroy() {
        this.sprite.destroy()
    }
}