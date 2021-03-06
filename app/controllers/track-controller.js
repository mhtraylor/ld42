import 'babel-polyfill'
import spacelord from 'data/spacelord'
import Note from 'components/note'

const OFFSET = 2.85

const TRACK_RANGE = new Map([
    [0, ['C', 'C#', 'D']],
    [1, ['D#', 'E', 'F']],
    [2, ['F#', 'G', 'G#']],
    [3, ['A', 'A#', 'B']]
])


export default class TrackController {

    constructor(scene) {
        this.scene = scene

        this.trackData
        this.midiNotes
        this.totalNumberNotes

        this.verticalOffset = 200
    }

    init() {
        // This is set specifically for spacelord
        this.trackData = spacelord
        this.midiNotes = this.trackData.tracks[0].notes
        this.totalNumberNotes = this.midiNotes.length

        this.generateTracks()
    }

    async generateTracks() {
        // Last note timestamp - default to note time from spawn to strum line offset
        let lastTime = OFFSET
        let index = 0

        this.scene.song.play()

        // Build the track in real time
        for (const note of this.midiNotes) {
            
            // Wait to spawn note
            await this.sleep(this.getNextNoteDelay(lastTime, note))

            // Generate a note
            this.generateNote(note, index)

            // Set last time
            lastTime = note.time
            index++
        }

        // wait 2 seconds
        await this.sleep(8000)

        this.scene.scene.start('win')
    }

    generateNote(data, noteNum) {
        if (noteNum < 1) {
            data.firstNote = true
        } else if (noteNum === this.totalNumberNotes - 1) {
            data.lastNote = true
        }

        // Get which track to play the note on
        const noteTrack = this.getTrackNumForNote(data.name)
        const config = {
            x: this.scene.tracks[noteTrack],
            y: this.verticalOffset,
            name: 'note_' + noteNum,
            noteData: data,
            speed: this.getSpeed(this.verticalOffset)
        }

        // Generate the note
        let note = new Note(this.scene, config.x, config.y)
        note.init(config)

        // Apply it to the notes array
        this.scene.notes.add(note)
    }

    getNextNoteDelay(lastTime, note) {
        return (note.time - lastTime) * 1000
    }

    getTrackNumForNote(name) {
        for (const [track, notes] of TRACK_RANGE) {
            for (const note of notes) {
                if (name.startsWith(note)) {
                    return track
                }
            }
        }
        return false
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    getSpeed(y) {
        const dist = 780 - 200
        const newDist = Math.abs(780 - y)

        return newDist * 3 / dist
    }

    setVerticalOffset(val) {
        this.verticalOffset = val
    }
}