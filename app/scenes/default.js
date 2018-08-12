import Phase from '../components/phase'
import Player from '../components/player'

const numTracks = 4

export default class DefaultScene extends Phaser.Scene {
    constructor () {
        super('default')
        
        this.patrick
        this.phases = []
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

        // let note = new Note(this, {
        //     pos: [100, 100],
        //     name: 'note'
        // })

        let graphics = this.add.graphics()
        graphics.fillStyle(0xFF0000, 1)
        graphics.fillCircle(216, -200, 300)

        this.patrick = new Player(this, this.tracks[1], 650)
        this.patrick.init()
        this.input.keyboard.on('keydown_P', this.pause, this)
        this.input.keyboard.once('keydown_Q', this.quit, this)
    }

    update () {
        this.starfield.tilePositionY -= 0.1

        for (let phase of this.phases) {
            phase.update()
        }
    }

    quit () {
        this.scene.start('menu');
    }

    pause () {
        this.scene.launch('pause');
        this.scene.pause();
    }
    
    shutdown () {}
}