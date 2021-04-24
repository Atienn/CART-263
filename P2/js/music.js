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
    currentTrackName: 'Nothing',

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
    loadTrack(trackName) {
        return loadSound(musicLocation + trackName + musicExt);
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
    },


    /**
     * Shows the name of the track playing at the bottom of the screen.
     */
    displayCurrTrack() {
        push(); //We don't want to keep the following text settings.

        textAlign(RIGHT, CENTER); //Align text to the right-center.
        textSize(15); //Reduce the text size.
        text(`Currently Playing:\n${music.currentTrackName}`, width - 5, height - 20); //Give credit to the artist.

        pop(); //Revert to the previous text settings.
    }
}