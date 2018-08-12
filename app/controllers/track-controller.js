import Phaser from 'phaser'
import Queue from '../utils/queue'

function generateTrack (midi, callback) {
    let lastTime = 0;

    let notes = midi.tracks[0].notes;

    let idx = 0;
    let len = notes.length;

    function doNext() {
        let entry = notes[idx];
        let wait;
        if (entry.time === 0) {
            wait = entry.duration * 1000;
        } else {
            wait = (entry.time - lastTime) * 1000;
        }
        callback(entry.name, wait)
        lastTime = entry.time;
        idx++;
        if (idx < len) {
            setTimeout(doNext, wait);
        }
    }
    doNext();
}

const TrackRange = new Map([
    [1, ['C', 'C#', 'D']],
    [2, ['D#', 'E', 'F']],
    [3, ['F#', 'G', 'G#']],
    [4, ['A', 'A#', 'B']]
])

function getTrackNumForNote (name) {
    for (const [track,notes] of TrackRange) {
        for (const note of notes) {
            if (name.startsWith(note)) {
                return track
            }
        }
    }
    return -1
}

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
    }

    queueNote(name, duration) {
        const track = getTrackNumForNote(name)
        this.tracks.get(track).enqueue() // TODO: create new note but better to use group as object pool
                                        // TODO: ote must be removed from queue when destroyed or returned to pool
    }
}
