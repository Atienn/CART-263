/* **************
PROJECT VECTOR
Étienne Racine

Built off template-p5-project. The program is a platformer game with a focus on speed.
The goal is to navigate pre-made levels in the shortest amount of time possible.

All music used is royalty-free.
************** */


//#region Structure

//Tracks which state the game is in.
let state;

//Tracks the user's desired settings (inputs, volume, etc).
let settings;

/** Object representation ofthe cursor. */
let mouse = {
    //Tracks if the user has clicked their mouse for the specific frame it's referred on.
    click: false,
    //The mouse's position on screen.
    pos: Vector2D.Zero(),

    /** Draws a custom '+' cursor at the mouse position that 'beats' with the music. */
    display() {
        rect(this.pos.x, this.pos.y, 10 + music.ampCurrent * 10, 1 + music.ampCurrent);
        rect(this.pos.x, this.pos.y, 1 + music.ampCurrent, 10 + music.ampCurrent * 10);
    }
}

//#endregion


//#region Display

//Tracks if the window was in focus last frame.
let wasFocused = true;

//Holds a hue value (0-359) that varies with time. 
//Starts at 140 so that the 'MenuState' setup will set it to 230 (blue).
let hueChange = 140;

//Holds the music currently playing.
let currentMusic;

//Tracks how much to offset the camera's view from the player's position.
let camOffset = new Vector2D(0,0);

//#endregion

//Disables p5 friendly errors and possibly leads to a performance boost.
p5.disableFriendlyErrors = true;


/**
 * Loads the music.
 * This function is called and completed before any other.
 */
function preload()
{
    //Since loading a sound file is asynchronous, placing it in 'preload()' prevents the program from continuing until it's done.
    //Load the track of the menu.
    MenuState.track = music.loadTrack(MenuState.trackName);

    //Load the track of every level.
    Level.list.forEach(level => {
        level.track = music.loadTrack(level.trackName);
    });

    //Get locally stored settings data if any is available.
    settings = JSON.parse(localStorage.getItem(`P1:Settings`));
    //If said data doesn't exist yet, create a new settings object with default values.
    if(!settings) { settingsHandler.resetSettings(); }
}

/**
 * Prepares the canvas/background and modifies general settings.
 * Is called once on startup.
 */
function setup() 
{
    //Create the canvas and set the background color
    createCanvas(windowWidth, windowHeight);

    //#region Display Settings
  
    noCursor(); //Hides the cursor as a custom one provided.
    colorMode(HSB); //HSB is useful as the saturation and brightness can be modified independently of hue.

    //Makes the default fill bright white, disable stroke and make line caps square.
    fill(100);
    noStroke();
    strokeCap(SQUARE);

    //Sets shapes to be drawn from the center.
    ellipseMode(RADIUS);
    rectMode(RADIUS);

    //Set the default text to be small and aligned from the left-center.
    textSize(20);
    textAlign(LEFT, CENTER);

    //#endregion

    //#region Audio Settings

    //Set the game volume.
    masterVolume(settings.volume / 10);

    //Give the current track an abstract sound file so that analyzers can connect to it and to
    //allow it to be stopped and switched to something else when calling the first 'state.setup()'.
    music.currentTrack = new p5.SoundFile();

    //Creates a FFT object with large smoothing and 128 output frequencies.
    //Here, smoothing means that the returned level of frequecies will rise and fall slower, appearing smoother.
    music.freqAnalyzer = new p5.FFT(0.75, 128);

    //Create an Amplitude object with little smoothing.
    music.ampAnalyzer = new p5.Amplitude();
    music.ampAnalyzer.smooth(0.1);

    //Allows the music to start.
    userStartAudio();

    //#endregion

    //Set the starting game state.
    state = MenuState;

    //Set density.    
    pixelDensity(settings.density / 10);


    //Call the state's setup before its behaviour.
    state.setup();
}


/**
 * Calls the current game state's update function and draw the cursor.
 */
function draw() 
{        
    //Don't update if the window is not in focus.
    if(focused)
    {
        //Set the new position of the mouse.
        mouse.pos.Set(mouseX, mouseY);

        //Measure the level of amplitude and send it to the amplitude variable.
        music.ampCurrent = music.ampAnalyzer.getLevel();
        //Measures the level of frequencies and sends them to the frequency array.
        music.freqCurrent = music.freqAnalyzer.analyze();

        //Call the game state's update function.
        state.update();

        //Now that all logic is done for this frame, assume that the user won't click next frame.
        mouse.click = false;


        //If the window wasn't focused last frame, then the cursor was enabled. Disables it. 
        if(!wasFocused)
        {
            //Consider the window as now being in focus.
            wasFocused = true;
            //Disable the cursor.
            noCursor();
        }
    }

    //If the window was in focus last frame, enable the cursor and display a message.
    else if(wasFocused)
    {
        //Consider the window as not being in focus anymore.
        wasFocused = false;

        //Enable the cursor.
        cursor();

        //Draw a semi-transparent black background over the previous frame.
        background(0,0,0,0.75);
        
        
        //OUT OF FOCUS MESSAGE

        push(); //We don't want to keep the following drawing settings.

        textSize(75); //Increase the text size.
        textAlign(CENTER, CENTER); //Align the text from the center.
        
        text('OUT OF FOCUS\nCLICK TO RESUME', width/2, height/2); //Display the message.
    
        pop(); //Revert to previous drawing settings.
    }
}



/**
 * Adjusts the size of what's displayed to match the window.
 * Is automatically called if the window is resized at any point.
 */
function windowResized()
{
//Resizes the canvas with the values of the window
resizeCanvas(windowWidth, windowHeight);
}


/** Safely switches to a new state by calling it's setup function first. */
function switchState(newState, level = null) {
    state.exit();
    state = newState;
    newState.setup(level);
}


/**
 * Only sets 'cursor.click' to true on the frame the user clicks their mouse.
 * This is very useful since it prevents any double input and the condition
 * can be checked with a global variable.
 */
function mousePressed() { mouse.click = true; }


/**
 * Quits the page, either by sending them somewhere 
 * in thier history, or by closing the page.
 */
 function quit() {

    //Force saving settings before exiting.
    settingsHandler.saveSettings();

    //Try to send the user to the previous page in their history.
    window.history.back();

    //If the user is still on the page, then there were no last page to go to.
    //Send the user to the next page in their history.
    window.history.forward();

    //Again, if the user is still on the page, then there were no page to go to.
    //Close the window or tab.
    window.close();
}