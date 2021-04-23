//The location of music files.
const musicLocation = 'assets/sounds/';
//The extenstion of music files.
const musicExt = '.mp3';

/**
 * 
 */
let music = {

    //Tracks the reference to the currently playing track.
    currentTrack: undefined,
    //Holds the name of the currently playing track.
    currentTrackName: 'Nonthing',

    //Is used to measure the level of multiple frequecies as 'music' plays out.
    freqAnalyzer: undefined,
    //Is used to meansure the amplitude level as 'music' plays out.
    ampAnalyzer: undefined,

    //Is used to meansure the amplitude level as 'music' plays out.
    ampCurrent: 0,
    //Holds the amplitude level measured for the current frame.
    freqCurrent: 0,


    /**
     * 
     */
    loadTrack(fileName) {
        return loadSound(musicLocation + fileName + musicExt);
    },


    /**
     * 
     */
    setTrack(track, trackName) {
        //Unlocks the analyzers from 'currentMusic' as it's switching track.
        //Not doing so causes the analyzers to stop working entirely.
        this.freqAnalyzer.setInput();
        this.ampAnalyzer.setInput();

        //Stop any currently playing music.
        this.currentTrack.stop();
        //Switch the current track to the playing state music.
        this.currentTrack = track;
        //Make the current track loop.
        this.currentTrack.loop();

        //Change the index of the music name accordingly.
        this.currentTrackName = trackName;

        //Sets the music as the input source. (Makes them ignore all other sounds, if any.)
        this.freqAnalyzer.setInput(this.currentTrack);
        this.ampAnalyzer.setInput(this.currentTrack);
    }
}