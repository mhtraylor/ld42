import Phaser from 'phaser'
import Queue from '../utils/queue'

export default class TrackController extends Phaser.GameObjects.Zone {

    constructor(scene, x, y) {
        super(scene, x, y)

        this.tracks = new Map([
            [0, new Queue([])],
            [1, new Queue([])],
            [2, new Queue([])],
            [3, new Queue([])]
        ])
        this.timer = new Clock(scene)
    }

    start() {
        this.timer.addEvent({
            delay: 500,
            callback: queueNote
        })
    }

}
