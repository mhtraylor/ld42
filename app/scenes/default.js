//import Note from '../components/platform/note'

const numTracks = 4

export default class DefaultScene extends Phaser.Scene {
    constructor () {
        super('default')
        
        this.patrick
        this.tracks = (() => {
            let left = 0
            let arr = []
            const segment = Math.floor(432 / 5)

            for (let i = 0; i < numTracks; i++) {
                left += segment
                arr.push(left)
            }

            return arr
        })()
    }

    init (data) {
        this.starfield = this.add.tileSprite(216, 384, 432, 768, 'starfield')
    }

    // pentium 2
    // titan g 45000x with watercooling
    // 27 gigs of ram
    // 1mb hard disk space
    // sound blaster 16
    // 56k connection

    create () {

        // let note = new Note({
        //     name: 'note'
        // })

        let graphics = this.add.graphics();
        graphics.fillStyle(0xFF0000, 1);
        graphics.fillCircle(216, -200, 300);

        this.patrick = this.add.sprite(this.tracks[0], 600, 'patrick')
        this.patrick.scaleX = 2        
        this.patrick.scaleY = 2

        this.input.keyboard.on('keydown_A', this.movePlayer, this)
        this.input.keyboard.on('keydown_S', this.movePlayer, this)
        this.input.keyboard.on('keydown_D', this.movePlayer, this)
        this.input.keyboard.on('keydown_F', this.movePlayer, this)

        this.input.keyboard.once('keydown_Q', this.quit, this);
    }

    update () {
        this.starfield.tilePositionY -= 0.1;
    }

    movePlayer (key) {
        const playerPosition = {
            x: this.patrick.x,
            y: this.patrick.y
        }
      
        switch (key.code) {
            case 'KeyA':
                this.patrick.x = this.tracks[0]
                break

            case 'KeyS':
                this.patrick.x = this.tracks[1]
                break

            case 'KeyD':
                this.patrick.x = this.tracks[2]
                break

            case 'KeyF':
                this.patrick.x = this.tracks[3]
                break
        }

        this.phasePlayer(playerPosition)
    }

    
    phasePlayer ({ x, y }) {
        let phase = this.physics.add.sprite(x, y, 'patrick')
        phase.scaleX = 2
        phase.scaleY = 2
        phase.tint = '0xAEFA4D'
        phase.alpha = 0.25
        phase.blendMode = 'ADD'

        if (this.patrick.x > x) {
            phase.setVelocity(-75, 0, 0)
        } else if (this.patrick.x < x) {
            phase.setVelocity(75, 0, 0)
        }
    }

    quit () {
        this.scene.start('menu');
    }
    
    shutdown () {}
}