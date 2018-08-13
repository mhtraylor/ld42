const file = require('./midi-controller')

const TrackRange = new Map([
    [1, ['C', 'C#', 'D']],
    [2, ['D#', 'E', 'F']],
    [3, ['F#', 'G', 'G#']],
    [4, ['A', 'A#', 'B']]
])

function getTrackNumForNote(name) {
    for (const [track, notes] of TrackRange) {
        for (const note of notes) {
            if (name.startsWith(note)) {
                return track
            }
        }
    }
    return -1
}

function generateTrack(callback) {
    const midi = file.spaceLord()
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
        let noteName = getTrackNumForNote(entry.name)
        callback({ note: noteName, time: wait })
        lastTime = entry.time;
        idx++;
        if (idx < len) {
            setTimeout(doNext, wait);
        }
    }
    doNext();
} exports.generateTrack = generateTrack;




