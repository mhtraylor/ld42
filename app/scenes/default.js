import Player from 'components/player'
import ScoreController from 'controllers/score';
import TrackController from 'controllers/track-controller';
import Phase from '../components/phase';

const numTracks = 4

export default class DefaultScene extends Phaser.Scene {
    constructor () {
        super('default')

        this.scoreController = new ScoreController(this)
        this.trackController = new TrackController(this)

        this.patrick
        this.phases
        this.notes

        this.strumLine

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

    init(data) {
        this.starfield = this.add.tileSprite(216, 384, 432, 768, 'starfield')
        this.song = this.sound.add('spacelord')
        this.trackStarted = false

        this.phases = this.add.group()
        this.notes = this.add.group()
    }

    // pentium 2
    // titan g 45000x with watercooling
    // 27 gigs of ram
    // 1mb hard disk space
    // sound blaster 16
    // 56k connection

    create() {
        this.scoreController.init()
        this.trackController.init()


        let graphics = this.add.graphics()
        graphics.fillStyle(0xFF0000, 1)
        graphics.fillCircle(216, -200, 300)


        this.strumLine = this.add.graphics()
        this.strumLine.lineStyle(2, 0xFF00FF)
        this.strumLine.beginPath()
        this.strumLine.moveTo(0, 670)
        this.strumLine.lineTo(432, 670)
        this.strumLine.closePath()
        this.strumLine.strokePath()


        this.patrick = new Player(this, this.tracks[1], 669)
        this.patrick.init()


        this.physics.world.addOverlap(this.notes, this.patrick.sprite, this.noteCollision)


        this.input.keyboard.on('keydown_P', this.pause, this)
        this.input.keyboard.on('keydown_Q', this.quit, this)
    }

    noteCollision(note, player) {
        note.handleHit()
    }

    update() {
        this.starfield.tilePositionY -= 0.2
        this.patrick.update()

        for (const note of this.notes.getChildren()) {
            note.update()
        }

        for (const phase of this.phases.getChildren()) {
            phase.update()
        }
    }

    quit() {
        this.pauseMusic()
        this.scene.launch('quit');
        this.scene.pause();
    }

    pause() {
        this.pauseMusic()
        this.scene.launch('pause');
        this.scene.pause();
    }

    shutdown() {}

    pauseMusic() {
        if (this.song.isPlaying) this.song.pause()
    }
    stopMusic() {
        if (this.song.isPlaying) this.song.stop()
    }
}