import 'babel-polyfill'
import spacelord from 'data/spacelord'
import Note from 'components/note'


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
    }

    init() {
        // This is set specifically for spacelord
        this.trackData = spacelord
        this.midiNotes = this.trackData.tracks[0].notes
        this.totalNumberNotes = this.midiNotes.length

        this.generateTracks()
    }

    async generateTracks() {
        // Last note timestamp in ms - default to first note
        let lastTime = this.midiNotes[0].time
        let index = 0

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
            y: 300,
            name: 'note_' + noteNum,
            noteData: data
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
}