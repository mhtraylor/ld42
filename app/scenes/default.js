import Note from 'components/note'
import Player from 'components/player'
import ScoreController from 'controllers/score';

const numTracks = 4

export default class DefaultScene extends Phaser.Scene {
    constructor () {
        super('default')
        
        this.scoreController = new ScoreController(this)
        this.tc = require('../controllers/track-controller')

        this.patrick
        this.phases = []
        this.notes = []

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
    }

    // pentium 2
    // titan g 45000x with watercooling
    // 27 gigs of ram
    // 1mb hard disk space
    // sound blaster 16
    // 56k connection

    create() {
        this.scoreController.init()

        let graphics = this.add.graphics()
        graphics.fillStyle(0xFF0000, 1)
        graphics.fillCircle(216, -200, 300)


        this.strumLine = this.add.graphics()
        this.strumLine.lineStyle(2, 0xFF00FF)
        this.strumLine.beginPath();
        this.strumLine.moveTo(0, 670);
        this.strumLine.lineTo(432, 670);
        this.strumLine.closePath();
        this.strumLine.strokePath();


        this.tc.generateTrack(data => {
            if (data) {
                console.log(data)
                let note = new Note(this, this.tracks[data.note], 300, data.time)
                note.init()
                this.notes.push(note)
            } else {
                // this should mean the song has ended
            }
        })

        /*
        let note = new Note(this, this.tracks[1], 300)
        note.init()
        this.notes.push(note)
        */



        this.patrick = new Player(this, this.tracks[1], 670)
        this.patrick.init()

        this.physics.world.addOverlap(this.notes[0].sprite, this.patrick.sprite, this.overlapMe)

        this.input.keyboard.on('keydown_P', this.pause, this)
        this.input.keyboard.on('keydown_Q', this.quit, this)
    }

    overlapMe(spr1, spr2) {
        console.log('overlap')
    }

    update() {
        this.starfield.tilePositionY -= 0.2
        this.patrick.update()
        
        for (let note of this.notes) {
            note.update()
        }
        

        this.t

        for (let phase of this.phases) {
            phase.update()
        }
    }

    quit() {
        this.scene.launch('quit');
        this.scene.pause();
    }

    pause() {
        this.scene.launch('pause');
        this.scene.pause();
    }
    
    shutdown() {}
}