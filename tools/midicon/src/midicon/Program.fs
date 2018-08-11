// Learn more about F# at http://fsharp.org

open System
open System.Collections.Generic
open Melanchall.DryWetMidi
open Melanchall.DryWetMidi.Smf
open Melanchall.DryWetMidi.Smf.Interaction
open Melanchall.DryWetMidi.Common
open Melanchall.DryWetMidi.Smf.Interaction
open Newtonsoft.Json

type Song =
    {   id          : string
        bpm         : int64
        spb         : float
        tracks      : Track list }
and Track =
    {   id          : string
        beats       : Beat list }
and Beat =
    {   id          : string
        beat        : float
        length      : float }

let microToSec (x: int64) = float x / 1_000_000.0
let milliToSec (x: int64) = float x / 1_000.0

let read (file: string) =
    async {
        let r: ReadingSettings = Unchecked.defaultof<ReadingSettings>
        return Smf.MidiFile.Read(file, r)
    }

let getChunkEvents (chunks: seq<TrackChunk>) = chunks |> Seq.map (fun x -> x.Events)

let mkTempo (tm: TempoMap) =
    let tmp = tm.Tempo.AtTime(1L)
    {   id      = ""
        bpm     = tmp.BeatsPerMinute
        spb     = 60.0 / float tmp.BeatsPerMinute
        tracks  = [] }

let mkBeat spb (tm: TempoMap) (n: Note) =
    let metric = n.LengthAs<MetricTimeSpan> tm
    let length = microToSec metric.TotalMicroseconds
    let musica = n.Leng
    {   id      = n.NoteName.ToString ()
        beat    =
        length  = length }

let mkTrack spb tm (id, notes: seq<Note>) =
    {   id      = id
        beats   = notes |> Seq.map (mkBeat spb tm) |> Seq.toList }

let proc (midi: MidiFile) =
    let chunks = midi.GetTrackChunks ()
    use tmgr   = new TempoMapManager (midi.TimeDivision, chunks |> getChunkEvents)
    let tm     = tmgr.TempoMap

    let song   = mkTempo tmgr.TempoMap
    let notes  =
        seq { for chk in chunks do
                use mgr = new NotesManager(chk.Events)
                yield! mgr.Notes }
    let tracks =
        notes |> Seq.groupBy (fun n -> n.Channel.ToString ())
              |> Seq.map (mkTrack song.spb tmgr.TempoMap)
              |> Seq.toList

    { song with tracks = tracks }

let mkSong path =
    async { let! midi = read path
            return proc midi }
    |> Async.RunSynchronously

let pickle x = JsonConvert.SerializeObject x

[<EntryPoint>]
let main argv =
    printfn "midicon:  MIDI Track Conversion"
    let path = argv.[0]
    if System.String.IsNullOrEmpty path then
        printfn "Path to MIDI file required."
        1
    else
        let song = mkSong path
        pickle song |> printfn "%A"
        0
