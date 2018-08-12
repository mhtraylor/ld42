import Phase from './phase'

export default class Player {
    constructor(scene, x, y) {
        this.scene = scene

        // Create the animations we need from the player spritesheet
        const anims = scene.anims
        anims.create({
            key: 'run',
            frames: anims.generateFrameNumbers('patrick', { start: 0, end: 5 }),
            frameRate: 7,
            repeat: -1
        })

        this.sprite = scene.add.sprite(x, y, 'patrick', 0).setScale(2)
        
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
                break

            case 'KeyS':
                this.sprite.x = this.scene.tracks[1]
                break

            case 'KeyD':
                this.sprite.x = this.scene.tracks[2]
                break

            case 'KeyF':
                this.sprite.x = this.scene.tracks[3]
                break
        }

        for (var i = 0; i < 6; i ++) {
            this.scene.phases.push(new Phase(this.scene, { x: playerPosition.x, y: playerPosition.y + i * 2 }, this.sprite))
        }
    }

    init() {
        this.sprite.anims.play('run', true)
    }

    destroy() {
        this.sprite.destroy()
    }
}